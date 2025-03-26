import { useEffect, useState } from "react";
import HomeLoader from '../../components/HomeLoader';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { jsPDF } from "jspdf";
import { FaExclamationCircle, FaFilePdf, FaSadCry } from "react-icons/fa";

export default function Invoices() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('token');

    // Fetch invoices from API
    const fetchInvoices = (page = 1) => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/invoices?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setTransactions(response.data.transactions.data);
                setTotalPages(response.data.transactions.last_page);
            })
            .catch((error) => {
                console.error("Error fetching invoices:", error);
                toast.error(error.response?.data?.msg || "Failed to load invoices");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchInvoices(currentPage);
    }, [currentPage]);

    // Print invoice
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

    if (loading) {
        return <HomeLoader />;
    }

    return (
        <div className="py-6 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                            <tr>
                                <th className="px-4 py-3 text-left rounded-tl-lg text-nowrap">Payment ID</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Plan</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-right rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.length == 0 && (
                                <tr className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="w-full px-4 py-8 text-sm font-medium text-gray-700" colSpan={6}>
                                        <div className="flex flex-col items-center justify-center py-4 gap-3">
                                            <FaExclamationCircle size={40} />
                                            <span>No Transaction was found.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                        {transaction.payment_id.slice(0, 8)}...
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {transaction.currency} {transaction.amount}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {transaction.plan.plan_name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 rounded-full text-sm ${transaction.payment_status === 'paid'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {transaction.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {new Date(transaction.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => generateInvoicePDF(transaction)}
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <FaFilePdf />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="mt-8 flex items-center justify-end space-x-4">

                    {/* Previous Button */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        ←
                    </button>

                    {/* Page Number Display */}
                    <span className="text-lg font-semibold bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-md">
                        Page {currentPage} of {totalPages}
                    </span>

                    {/* Next Button */}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg shadow-md 
disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        →
                    </button>
                </div>

            </div>
        </div>
    );
}