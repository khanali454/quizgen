import { useNavigate } from 'react-router-dom';
import DefaultPagination from '../common/DefaultPagination';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Processor from '../common/Processor';
import { jsPDF } from "jspdf";
import { MdOutlineArticle } from "react-icons/md";

const Invoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('adminAuthToken');

  const fetchInvoices = async (page = 1) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/invoices?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status) {
        setInvoices(response?.data?.transactions?.data);
        setTotalPages(response?.data?.transactions?.last_page);
        setCurrentPage(response?.data?.transactions?.current_page);
      }
    } catch (error) {
      toast.error("Error in fetching invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchInvoices(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchInvoices(page);
  };

 

  const generateInvoicePDF = (invoice) => {
    const doc = new jsPDF();
  
    // Set default font
    doc.setFont("helvetica");
  
    // Add logo (optional)
    // doc.addImage(logo, 'PNG', 10, 10, 50, 20);
  
    // Add invoice title
    doc.setFontSize(24);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("INVOICE", 10, 30);
  
    // Add invoice details section
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125); // Gray
    doc.text(`Invoice ID: ${invoice.id}`, 150, 20);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 150, 30);
  
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200); // Light gray
    doc.line(10, 40, 200, 40);
  
    // Add user details
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("Bill To:", 10, 50);
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125); // Gray
    doc.text(`${invoice.user.name}`, 10, 60);
    doc.text(`${invoice.user.email}`, 10, 70);
    doc.text(`${invoice.user.phone_number}`, 10, 80);
  
    // Add plan details
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("Plan Details:", 10, 100);
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125); // Gray
    doc.text(`Plan Name: ${invoice.plan.plan_name}`, 10, 110);
    doc.text(`Billing Interval: ${invoice.plan.billing_interval}`, 10, 120);
  
    // Add payment details
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("Payment Details:", 10, 140);
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125); // Gray
    doc.text(`Amount: ${invoice.amount} ${invoice.currency}`, 10, 150);
    doc.text(`Payment Status: ${invoice.payment_status}`, 10, 160);
  
    // Add a table for the invoice breakdown
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("Invoice Breakdown", 10, 180);
  
    // Table headers
    doc.setFillColor(241, 243, 245); // Light gray background
    doc.rect(10, 185, 190, 10, "F");
    doc.setFontSize(12);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("Description", 15, 190);
    doc.text("Amount", 150, 190);
  
    // Table row
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125); // Gray
    doc.text(`${invoice.plan.plan_name} (${invoice.plan.billing_interval})`, 15, 200);
    doc.text(`${invoice.amount} ${invoice.currency}`, 150, 200);
  
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200); // Light gray
    doc.line(10, 205, 200, 205);
  
    // Add total amount
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41); // Dark gray
    doc.text("Total Amount:", 150, 220);
    doc.text(`${invoice.amount} ${invoice.currency}`, 150, 230);
  
    // Add a thank you message
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125); // Gray
    doc.text("Thank you for your purchase!", 10, 250);
  
    // Save the PDF
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <>
      <Breadcrumb pageName="Invoices" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
        

          <div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      User Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Plan Name
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Amount
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Payment Status
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Created At
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="py-4 w-full flex items-center justify-center">
                          <Processor />
                        </div>
                      </td>
                    </tr>
                  ) : invoices.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="w-full flex flex-col items-center justify-center py-10">
                          <MdOutlineArticle className="text-6xl text-gray-400" />
                          <p className="text-gray-500 mt-2">No invoices found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    invoices.map((invoice, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {invoice.user.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {invoice.plan.plan_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {invoice.amount} {invoice.currency}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${invoice.payment_status === "paid"
                              ? 'bg-success text-success'
                              : 'bg-danger text-danger'
                              }`}
                          >
                            {invoice.payment_status}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {new Date(invoice.created_at).toDateString()}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              className="hover:text-primary"
                              onClick={() => generateInvoicePDF(invoice)}
                            >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
</svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {invoices.length > 0 && (
              <DefaultPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoices;