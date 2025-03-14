import { useNavigate } from 'react-router-dom';
import DefaultPagination from '../common/DefaultPagination';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Processor from '../common/Processor';
import ConfirmBox from '../common/ConfirmBox';
import { MdOutlineArticle } from "react-icons/md";

const User = () => {
  // used for pages navigation
  const navigate = useNavigate();
  // filter state with default all user's roles
  const [roleFilter, setRoleFilter] = useState('all');
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // logged in user token
  const token = localStorage.getItem('adminAuthToken');


  // for handling delete item - states
  const [showConfirm, setShowConfirm] = useState(false);
  const [delete_item, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // for fetching user
  const fetchUsers = async (page = 1) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${roleFilter ? roleFilter : "all"}${query ? "/"+query : ""}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status) {
        setUsers(response?.data?.users?.data);
        setTotalPages(response?.data?.users?.last_page);
        setCurrentPage(response?.data?.users?.current_page);
      }
    } catch (error) {
      toast.error("Error in fetching users");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [query, roleFilter])

  useEffect(() => {
    setLoading(true);
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
  };



  const handleDelete = async (uid) => {
    setDeleteItem(uid);
    setShowConfirm(true);
  }

  const proceedDelete = () => {
    if (delete_item != null) {
      setDeleting(true);
      try {
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${delete_item}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response?.data?.status) {
            toast.success(response?.data?.msg);
            fetchUsers(1);
          } else {
            toast.error(response?.data?.msg);
          }
        }).finally(() => {
          setDeleting(false);
          setShowConfirm(false);
          setDeleteItem(null);
        }).catch((error)=>{
          toast.error(error?.response?.data?.msg || "Unexpected error has occured");
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error(error?.response?.data?.msg || "Unexpected error has occured");
      }
    }
  }


  // navigate to new user page
  const handleAddNewUser = () => {
    navigate('/user/new');
  }



  return (
    <>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
          <div className="flex flex-col sm:flex-row items-center justify-between mt-5 mb-3 space-y-4 sm:space-y-0">
            {/* Left Side: Real-time Search */}
            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0">
              <input
                type="search"
                name="search"
                onChange={(e) => { setLoading(true); setQuery(e.target.value) }}
                placeholder="Search here..."
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Right Side: Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              {/* Role Filter Buttons */}
              <div className="flex justify-center space-x-2">
                {['all', 'admin', 'user'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${roleFilter === role
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {role === 'all' ? 'All' : `${role}s`}
                  </button>
                ))}
              </div>

              {/* Add New User Button */}
              <button
                onClick={handleAddNewUser}
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                New User
              </button>
            </div>
          </div>

          <div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      phone
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Plan
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Address
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Joined
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {loading ? (
                    <tr>
                      <td colSpan={8}>
                        <div className="py-4 w-full flex items-center justify-center">
                          <Processor />
                        </div>
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={8}>
                        <div className="w-full flex flex-col items-center justify-center py-10">
                          <MdOutlineArticle className="text-6xl text-gray-400" />
                          <p className="text-gray-500 mt-2">No user found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {users.map((user, key) => (
                        <tr key={key}>
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                              {user.name}
                            </h5>
                            <p className="text-xs py-2">
                              <span style={{ textTransform: "capitalize" }} className={`flex items-center justify-center text-white w-fit py-1 px-1 text-xs rounded-sm ${user?.role == "admin" ? "bg-green-400" : "bg-blue-400"}`}>{user?.role}</span>
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {user.email}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {user.phone}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {user?.subscription?.id && (
                                <>
                                  <p className='bg-green-400 px-4 py-1 rounded text-xs text-white w-fit'>subscribed</p>
                                  <p className='py-2'>
                                    <span className="text-nowrap text-sm">
                                      {user?.subscription?.plan?.plan_name} ( <span className={`${user?.subscription?.plan?.plan_type == "paid" ? 'text-green-400' : 'text-blue-400'} `}>{user?.subscription?.plan?.plan_type}</span> )
                                    </span> <br />
                                    <span className="text-nowrap text-sm">
                                      <b>Started On : </b> {user?.subscription?.start_date}
                                    </span> <br />
                                    <span className="text-nowrap text-sm">
                                      <b>Expiry : </b> {user?.subscription?.end_date}
                                    </span> <br />
                                  </p>
                                </>
                              )}

                              {!user?.subscription?.id && (
                                <p className='bg-gray-200 px-4 py-1 rounded text-xs text-gray-600 w-fit text-nowrap'>not subscribed</p>
                              )}

                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {user.address}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {user.created_at}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p
                              className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${user?.status === "active"
                                ? 'bg-success text-success'
                                : user?.status === "suspended"
                                  ? 'bg-danger text-danger'
                                  : 'bg-warning text-warning'
                                }`}
                            >
                              {user?.status}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                              <button className="hover:text-primary">
                                <svg width="18"
                                  height="18"
                                  viewBox="0 0 18 18" fill="currentColor" className="bi bi-pencil-square">
                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                              </button>
                              <button className="hover:text-primary" onClick={() => { handleDelete(user?.id) }}>
                                <svg
                                  className="fill-current"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                    fill=""
                                  />
                                  <path
                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                    fill=""
                                  />
                                  <path
                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                    fill=""
                                  />
                                  <path
                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                    fill=""
                                  />
                                </svg>
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                  {/* {users.map((user, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {user.name}
                        </h5>
                        <p className="text-xs py-2">
                          <span style={{ textTransform: "capitalize" }} className={`flex items-center justify-center text-white w-[50px] py-1 text-xs rounded-sm ${user?.role == "admin" ? "bg-green-400" : "bg-blue-400"}`}>{user?.role}</span>
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.phone}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user?.subscription?.id && (
                            <>
                              <p className='bg-green-400 px-4 py-1 rounded text-xs text-white w-fit'>subscribed</p>
                              <p className='py-2'>
                                <span className="text-nowrap text-sm">
                                  {user?.subscription?.plan_detail?.planName} ( <span className={`${user?.subscription?.plan_detail?.type == "premium" ? 'text-green-400' : 'text-blue-400'} `}>{user?.subscription?.plan_detail?.type}</span> )
                                </span> <br />
                                <span className="text-nowrap text-sm">
                                  <b>Credits : </b> {user?.subscription?.totalCredits - user?.subscription?.usedCredits} / <span className="text-green-400">
                                    {user?.subscription?.totalCredits}
                                  </span>
                                </span> <br />
                                <span className="text-nowrap text-sm">
                                  <b>Billed : </b> {user?.subscription?.billed}
                                </span> <br />
                                <span className="text-nowrap text-sm">
                                  <b>Started On : </b> {user?.subscription?.startDate}
                                </span> <br />
                                <span className="text-nowrap text-sm">
                                  <b>Expiry : </b> {user?.subscription?.endDate}
                                </span> <br />
                              </p>
                            </>
                          )}

                          {!user?.subscription?.id && (
                            <p className='bg-gray-200 px-4 py-1 rounded text-xs text-gray-600 w-fit text-nowrap'>not subscribed</p>
                          )}

                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.address}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.created_at}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${user?.status === "active"
                            ? 'bg-success text-success'
                            : user?.status === "suspended"
                              ? 'bg-danger text-danger'
                              : 'bg-warning text-warning'
                            }`}
                        >
                          {user?.status}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button className="hover:text-primary">
                            <svg width="18"
                              height="18"
                              viewBox="0 0 18 18" fill="currentColor" className="bi bi-pencil-square">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </button>
                          <button className="hover:text-primary">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
            {users.length > 0 && (
              <DefaultPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>


        </div>
      </div>

      {/* confirm box */}
      {showConfirm && (
        <ConfirmBox
          message="Are you sure you want to proceed?"
          buttonText={deleting ? (<div className='flex items-center justify-center'><Processor borderColorValue='white' widthValue={4} heightValue={4} /> <span className="ml-2">Confirm</span> </div>) : (<>Confirm</>)}
          onConfirm={() => {
            proceedDelete();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};
export default User;
