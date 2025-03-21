import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import toast from 'react-hot-toast';
import Processor from '../common/Processor';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../common/Loader';

const EditPlan = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    let token = localStorage.getItem('adminAuthToken');
    const [planData, setPlanData] = useState(
        {
            planType: 'paid', // 'trial' or 'paid'
            planName: '',
            billingInterval: 'monthly', // monthly or yearly
            filesUploadLimit: 3,
            uploadFormats: ['DOCX'],
            mcqPerRequest: 10,
            mcqTypes: ['True_False'],
            difficultyLevels: ['Easy'],
            specificSubject: false,
            languageSupport: ['English'],
            onlineTest: false,
            downloadFormats: ['PDF'],
            requests: 50,
            price: 8
        }
    );

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/plans/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response?.data?.status) {
                let plan = response?.data?.plan;
                console.log(" plan : ", plan);
                setPlanData({
                    planType: plan.plan_type, // 'trial' or 'paid'
                    planName: plan.plan_name,
                    billingInterval: plan?.billing_interval, // monthly or yearly
                    filesUploadLimit: plan?.files_upload_limit,
                    uploadFormats: plan?.upload_formats,
                    mcqPerRequest: plan?.mcq_per_request,
                    mcqTypes: plan?.mcq_types,
                    difficultyLevels: plan?.difficulty_levels,
                    specificSubject: plan?.specific_subject,
                    languageSupport: plan?.language_support,
                    onlineTest: plan?.online_test,
                    downloadFormats: plan?.download_formats,
                    requests: plan?.requests,
                    price: plan?.price
                });
            } else {
                toast.error("Plan not found");
                setTimeout(() => {
                    navigate("/plans");
                }, 500);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, [])


    useEffect(() => {
        console.log("planData : ", planData);
    }, [planData])

    /**
     *  on any input change , it will get triggered
     * for trial plans , it will set price to 0
     * */
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'planType') {
            setPlanData(prev => ({
                ...prev,
                [name]: value,
                price: value === 'trial' ? 0 : prev.price,
                billingInterval: value === 'trial' ? 'none' : 'monthly'
            }));
        } else {
            setPlanData(prev => ({ ...prev, [name]: value }));
        }
    };

    /**
     * 
     * on checkbox change - it will adjust/toggle values in planData
     */
    const handleCheckboxChange = (field, value) => (e) => {
        console.log("value : ", field);
        console.log("value : ", value);
        console.log("values : ", e.target.checked);
        const newValues = e.target.checked
            ? [...planData[field], value]
            : planData[field].filter(item => item !== value);
        setPlanData(prev => ({ ...prev, [field]: newValues }));
    };

    // validate plan data 
    function validatePlanData(plan) {
        if (plan.planName.trim() === "") {
            toast.error("Plan name is required.");
            return false;
        }


        if (plan.filesUploadLimit < 1) {
            toast.error("File upload limit must be at least 1.");
            return false;
        }

        if (plan.uploadFormats.length < 1) {
            toast.error("Please select at least one upload format.");
            return false;
        }

        if (plan.mcqPerRequest < 1) {
            toast.error("MCQs per request must be at least 1.");
            return false;
        }

        if (plan.mcqTypes.length < 1) {
            toast.error("Please select at least one MCQ type.");
            return false;
        }

        if (plan.difficultyLevels.length < 1) {
            toast.error("Please select at least one difficulty level.");
            return false;
        }

        if (plan.languageSupport.length < 1) {
            toast.error("Please select at least one supported language.");
            return false;
        }

        if (plan.downloadFormats.length < 1) {
            toast.error("Please select at least one download format.");
            return false;
        }

        if (plan.requests < 1) {
            toast.error("The number of requests must be at least 1.");
            return false;
        }

        if (plan.planType === "paid" && plan.price < 1) {
            toast.error("Plan price must be greater than zero.");
            return false;
        }

        return true;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);


        // if (validatePlanData(planData)) {
        axios.put(`${import.meta.env.VITE_API_BASE_URL}/admin/plans/${id}`, planData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response?.data?.status) {
                toast.success(response?.data?.msg);
            } else {
                toast.error(response?.data?.msg);
            }
        }).catch((error) => {
            toast.error(error.response.data.message)
        }).finally(() => {
            setProcessing(false);
        });
        // }
    };

    return (
        <>
            <Breadcrumb pageName="Edit Plan" />
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Edit Plan</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    {/* Plan Type Selection */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">Plan Type</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="planType"
                                                    value="paid"
                                                    checked={planData.planType === 'paid'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="text-black dark:text-white">Paid Plan</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="planType"
                                                    value="trial"
                                                    checked={planData.planType === 'trial'}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="text-black dark:text-white">Trial Plan</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">Plan Name</label>
                                            <input
                                                type="text"
                                                name="planName"
                                                value={planData.planName}
                                                onChange={handleInputChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>


                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">Billing Interval</label>
                                            <select
                                                name="billingInterval"
                                                value={planData.billingInterval}
                                                onChange={handleInputChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="monthly">Monthly</option>
                                                <option value="yearly">Yearly</option>
                                            </select>
                                        </div>

                                    </div>




                                    {/* Storage Limit */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">Total Files Upload Limit</label>
                                        <input
                                            type="number"
                                            name="filesUploadLimit"
                                            value={planData.filesUploadLimit}
                                            onChange={handleInputChange}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    {/* Upload Formats */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">Upload Formats</label>
                                        <div className="flex gap-4">
                                            {['DOCX', 'TXT', 'PDF','PPTX'].map(format => (
                                                <label key={format} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={planData.uploadFormats.includes(format)}
                                                        onChange={handleCheckboxChange('uploadFormats', format)}
                                                    />
                                                    <span className="text-black dark:text-white">{format}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* MCQ Settings */}
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">MCQs per Request</label>
                                            <input
                                                type="number"
                                                name="mcqPerRequest"
                                                value={planData.mcqPerRequest}
                                                onChange={handleInputChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">MCQ Types</label>
                                            <div className="flex gap-4">
                                                {['True_False', 'MCQs', 'Fill_in_the_Blanks'].map(type => (
                                                    <label key={type} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={planData.mcqTypes.includes(type)}
                                                            onChange={handleCheckboxChange('mcqTypes', type)}
                                                        />
                                                        <span className="text-black dark:text-white">{type.replaceAll('_', ' ')}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Difficulty Levels */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">Difficulty Levels</label>
                                        <div className="flex gap-4">
                                            {['Easy', 'Medium', 'Hard'].map(level => (
                                                <label key={level} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={planData.difficultyLevels.includes(level)}
                                                        onChange={handleCheckboxChange('difficultyLevels', level)}
                                                    />
                                                    <span className="text-black dark:text-white">{level}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Additional Features */}
                                    <div className="mb-4.5 grid grid-cols-2 gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={planData.specificSubject}
                                                onChange={(e) => setPlanData(prev => ({ ...prev, specificSubject: e.target.checked }))}
                                            />
                                            <span className="text-black dark:text-white">Specific Subject</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={planData.onlineTest}
                                                onChange={(e) => setPlanData(prev => ({ ...prev, onlineTest: e.target.checked }))}
                                            />
                                            <span className="text-black dark:text-white">Online Test  <span className="text-xs text-red-400">(Not supported in this version)</span> </span>
                                        </label>
                                    </div>

                                    {/* Language Support */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">Language Support</label>
                                        <div className="flex gap-4">
                                            {['English', 'Arabic'].map(lang => (
                                                <label key={lang} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={planData.languageSupport.includes(lang)}
                                                        onChange={handleCheckboxChange('languageSupport', lang)}
                                                    />
                                                    <span className="text-black dark:text-white">{lang}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Download Formats */}
                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">Download Formats</label>
                                        <div className="flex gap-4">
                                            {['PDF', 'DOCX','PPTX'].map(format => (
                                                <label key={format} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={planData.downloadFormats.includes(format)}
                                                        onChange={handleCheckboxChange('downloadFormats', format)}
                                                    />
                                                    <span className="text-black dark:text-white">{format}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pricing Section */}
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Requests {planData.billingInterval === 'monthly' ? '/month' : '/year'}
                                            </label>
                                            <input
                                                type="number"
                                                name="requests"
                                                value={planData.requests}
                                                onChange={handleInputChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">Price (USD)</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={planData.price}
                                                onChange={handleInputChange}
                                                disabled={planData.planType === 'trial'}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">

                                        {processing ? (<div className='flex items-center justify-center'><Processor borderColorValue='white' widthValue={4} heightValue={4} /> <span className="ml-2">Update Plan</span> </div>) : (
                                            <>Update Plan</>
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

export default EditPlan;