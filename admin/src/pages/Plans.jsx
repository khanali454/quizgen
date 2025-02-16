import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
const plans = [
  {
    id: 1,
    planName: "Basic Plan",
    type: "trial",
    features: [
      {
        name: "questionsLimit",
        description: "Generate Up to 30 papers monthly & 400 papers yearly",
        monthly_credit: "30",
        yearly_credit: "400",
      },
      {
        name: "specificTopicPrompt",
        description: "Specify Topic"
      }
    ],
    plans: [
      {
        duration: "Monthly",
        price: "0 SAR",
      },
      {
        duration: "Yearly",
        price: "0 SAR",
      },
    ],
  },
  {
    id: 2,
    planName: "Standard Plan",
    type: "premium",
    features: [
      {
        name: "questionsLimit",
        description: "Generate Up to 50 papers monthly & 600 papers yearly",
        monthly_credit: "50",
        yearly_credit: "600",
      },
    ],
    plans: [
      {
        duration: "Monthly",
        price: "20 SAR",
      },
      {
        duration: "Yearly",
        price: "200 SAR",
      },
    ],
  },
  {
    id: 3,
    planName: "Premium Plan",
    type: "premium",
    features: [
      {
        name: "questionsLimit",
        description: "Generate Up to 80 papers monthly & 900 Yearly",
        monthly_credit: "80",
        yearly_credit: "900",
      },
    ],
    plans: [
      {
        duration: "Monthly",
        price: "30 SAR",
      },
      {
        duration: "Yearly",
        price: "300 SAR",
      },
    ],
  },
];

const Plans = () => {

  const navigate = useNavigate();
  const handleAddNewPlan = () => {
    navigate('/plans/new');
  }


  return (
    <>
      <Breadcrumb pageName="Plans" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
          <div className="flex items-center justify-between mt-5 mb-3">
            {/* Left Side: Real-time Search */}
            <div className="flex items-center w-1/3">
              <input
                type="search"
                name="search"
                placeholder="Search here..."
                className="w-full px-4 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            {/* Right Side: Button */}
            <button onClick={() => { handleAddNewPlan() }} className="px-4 text-sm py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Add New
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">Plan Name</th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Features</th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Type</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Pricing</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="">{plan.planName}</h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <ul style={{ listStyle: "disc" }}>
                        {plan?.features?.map((feature, index2) => (
                          <li key={index2} className="">
                            {feature.description}
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {plan.type}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {plan.plans.map((pricing, i) => (
                        <p key={i} className="">
                          {pricing.duration}: {pricing.price}
                        </p>
                      ))}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button onClick={() => handleEdit(index)} className="hover:text-primary">
                          <svg width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(index)} className="hover:text-primary">
                          <svg width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zM4.118 7h7.764l-.82 6.567A1 1 0 0 1 10.064 15H5.936a1 1 0 0 1-.998-.933L4.118 7z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1zm-1-.5V2h-10v.5h10z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
};
export default Plans;
