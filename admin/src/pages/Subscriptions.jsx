import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultPagination from '../common/DefaultPagination';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Processor from '../common/Processor';
import toast from 'react-hot-toast';
import { MdOutlineArticle } from "react-icons/md";

const Subscriptions = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('adminAuthToken');

    // Fetch subscriptions from API
    const fetchSubscriptions = async (page = 1) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/subscriptions?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.status) {
                setSubscriptions(response?.data?.subscriptions?.data);
                setTotalPages(response?.data?.subscriptions?.last_page);
                setCurrentPage(response?.data?.subscriptions?.current_page);
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, [query]);

    useEffect(() => {
        setLoading(true);
        fetchSubscriptions(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchSubscriptions(page);
    };

    const handleNotifyUser = async (subscriptionId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/admin/subscriptions/${subscriptionId}/notify`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response?.data?.status) {
                toast.success(response?.data?.msg);
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.error('Error notifying user:', error);
            toast.error('Failed to notify user.');
        }
    };

    return (
        <>
            <Breadcrumb pageName="Subscriptions" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
                    <div className="flex items-center justify-between mt-5 mb-3">
                        <div className="flex items-center w-[200px]">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search subscriptions..."
                                onChange={(e) => { setLoading(true); setQuery(e.target.value) }}
                                autoComplete='false'
                                className="w-full px-4 py-1 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        {loading ? (
                            <div className="py-4 w-full flex items-center justify-center">
                                <Processor />
                            </div>
                        ) : subscriptions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <MdOutlineArticle className="text-6xl text-gray-400" />
                                <p className="text-gray-500 mt-2">No subscriptions available</p>
                            </div>
                        ) : (
                            <>
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Subscriber</th>
                                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">Plan</th>
                                                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Start Date</th>
                                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">End Date</th>
                                                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscriptions.map((subscription) => (
                                                <tr key={subscription.id}>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <h5>{subscription.subscriber.name}</h5>
                                                        <p className="text-sm text-gray-500">{subscription.subscriber.email}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <h5>{subscription.plan.plan_name}</h5>
                                                        <p className="text-sm text-gray-500">{subscription.plan.billing_interval}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <span className={`px-2 py-1 text-sm rounded ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {subscription.status}
                                                        </span>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        {new Date(subscription.start_date).toDateString()}
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        {new Date(subscription.end_date).toDateString()}
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            <button
                                                                className="hover:text-primary"
                                                                onClick={() => handleNotifyUser(subscription.id)}
                                                            >
                                                                Notify User
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <DefaultPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscriptions;