import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Loader from '../common/Loader';
import Processor from '../common/Processor';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    role: '',
    plan: '',
    address: '',
    status: 'active'
  });
  let token = localStorage.getItem('adminAuthToken');

  const [plans, setPlans] = useState([
    {
      id: 1,
      plan_name: 'basic'
    },
    {
      id: 2,
      plan_name: 'pro'
    }
  ]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/load/plans`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setPlans(response?.data?.plans);

      axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        let user_data = response?.data?.user;
        setUserData({
          name: user_data?.name,
          email: user_data?.email,
          password: '',
          phone_number: user_data?.phone_number,
          role: user_data?.role,
          plan: user_data?.subscription?.plan_id,
          address: user_data?.address,
          status: user_data?.status
        });
      }).finally(() => {
        setLoading(false);
      })
    }).catch((error) => {
      toast.error('Error occured while fetching the user');
      setLoading(false);
    });
  }, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);


    axios.put(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response?.data?.status) {
        toast.success(response?.data?.msg);
      }
    }).catch((error) => {
      toast.error(error.response.data.msg);
    }).finally(() => {
      setProcessing(false);
    });
  };

  return (
    <>
      <Breadcrumb pageName="Edit User" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- edit User Form --> */}
          {loading ? (
            <Loader />
          ) : (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit User
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        defaultValue={userData.name}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Email <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        defaultValue={userData.email}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Password <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={userData.password}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Phone Number <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="number"
                        name="phone_number"
                        placeholder="Enter phone number"
                        defaultValue={userData.phone_number}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">


                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Role
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          name="role"
                          value={userData.role}
                          onChange={handleChange}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        >
                          {['User','Admin'].map((role) => (
                            <option value={role?.toLowerCase()} selected={userData?.role?.toLowerCase()==role?.toLowerCase()} className="text-body dark:text-bodydark">
                              {role}
                            </option>
                          ))}
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-red-400 font-bold dark:text-white">
                        Assign Plan
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          name="plan"
                          value={userData.plan}
                          onChange={handleChange}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        >
                          <option value="" className="text-body dark:text-bodydark">
                            Select Plan
                          </option>
                          {plans?.length > 0 && plans.map((plan) => (
                            <option value={plan?.id} selected={plan.id==userData.plan} className="text-body dark:text-bodydark">
                              {plan?.plan_name}
                            </option>
                          ))}


                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">


                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={userData.address}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Status
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          name="status"
                          value={userData.status}
                          onChange={handleChange}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        >
                           {['Active','Blocked'].map((status) => (
                            <option value={status?.toLowerCase()} selected={userData?.status?.toLowerCase()==status?.toLowerCase()} className="text-body dark:text-bodydark">
                              {status}
                            </option>
                          ))}
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>



                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    {processing ? (
                      <div className='flex items-center justify-center'>
                        <Processor borderColorValue='white' widthValue={4} heightValue={4} />
                        <span className="ml-2">Saving...</span>
                      </div>
                    ) : (
                      <>Save</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default EditUser;