import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const NewPlan = () => {
    const [planData, setPlanData] = useState({
        planName: '',
        planType: 'trial', // default type
        selectedFeatures: {
            questionsLimit: true, // By default, enabled
            specificTopicPrompt: true, // By default, enabled
        },
        questionsLimitMonthlyCredit: '30',
        questionsLimitYearlyCredit: '400',
        questionsLimitMonthlyPrice: '',
        questionsLimitYearlyPrice: '',
    });

    // Handle input change for form fields
    const handleInputChange = (e, field) => {
        const { name, value } = e.target;
        setPlanData({ ...planData, [name]: value });
    };

    // Handle feature toggle (checkbox) for predefined features
    const handleFeatureToggle = (feature) => {
        setPlanData({
            ...planData,
            selectedFeatures: {
                ...planData.selectedFeatures,
                [feature]: !planData.selectedFeatures[feature],
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Plan Data:', planData);
    };

    return (
        <>
            <Breadcrumb pageName="Create New Plan" />
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    {/* <!-- New Plan Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Create New Plan</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">Plan Name</label>
                                        <input
                                            type="text"
                                            name="planName"
                                            value={planData.planName}
                                            onChange={(e) => handleInputChange(e, 'planName')}
                                            placeholder="Enter plan name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">Plan Type</label>
                                        <select
                                            name="planType"
                                            value={planData.planType}
                                            onChange={(e) => handleInputChange(e, 'planType')}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        >
                                            <option value="trial">Trial</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Feature Toggle Section */}
                                <div className="mb-4.5">
                                    <h4 className="font-medium text-black dark:text-white mb-4">Features</h4>
                                    <div className="flex flex-col gap-6">
                                        {/* Questions Limit Feature */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={planData.selectedFeatures.questionsLimit}
                                                onChange={() => handleFeatureToggle('questionsLimit')}
                                                className="mr-3"
                                            />
                                            <label className="text-black dark:text-white">
                                                <strong>Questions Limit</strong> - Generate Up to {planData.questionsLimitMonthlyCredit} papers monthly & {planData.questionsLimitYearlyCredit} papers yearly
                                            </label>
                                        </div>

                                        {/* If Questions Limit is enabled, show credit inputs */}
                                        {planData.selectedFeatures.questionsLimit && (
                                            <div className="flex flex-col gap-6">
                                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                                    <div className="w-full xl:w-1/2">
                                                        <label className="mb-2.5 block text-black dark:text-white">Monthly Credit</label>
                                                        <input
                                                            type="number"
                                                            name="questionsLimitMonthlyCredit"
                                                            value={planData.questionsLimitMonthlyCredit}
                                                            onChange={(e) => handleInputChange(e, 'questionsLimitMonthlyCredit')}
                                                            placeholder="Enter monthly credit limit"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="w-full xl:w-1/2">
                                                        <label className="mb-2.5 block text-black dark:text-white">Yearly Credit</label>
                                                        <input
                                                            type="number"
                                                            name="questionsLimitYearlyCredit"
                                                            value={planData.questionsLimitYearlyCredit}
                                                            onChange={(e) => handleInputChange(e, 'questionsLimitYearlyCredit')}
                                                            placeholder="Enter yearly credit limit"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        )}

                                        {/* Specific Topic Prompt Feature */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={planData.selectedFeatures.specificTopicPrompt}
                                                onChange={() => handleFeatureToggle('specificTopicPrompt')}
                                                className="mr-3"
                                            />
                                            <label className="text-black dark:text-white">
                                                <strong>Specific Topic Prompt</strong> - Specify Topic
                                            </label>
                                        </div>

                                        <div className="mb-4.5">
                                            <h4 className="font-medium text-black dark:text-white mb-4">Pricing</h4>
                                            {/* Prices for Monthly and Yearly */}
                                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                                <div className="w-full xl:w-1/2">
                                                    <label className="mb-2.5 block text-black dark:text-white">Monthly Price (SAR)</label>
                                                    <input
                                                        type="number"
                                                        name="questionsLimitMonthlyPrice"
                                                        value={planData.questionsLimitMonthlyPrice}
                                                        onChange={(e) => handleInputChange(e, 'questionsLimitMonthlyPrice')}
                                                        placeholder="Enter monthly price"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                                <div className="w-full xl:w-1/2">
                                                    <label className="mb-2.5 block text-black dark:text-white">Yearly Price (SAR)</label>
                                                    <input
                                                        type="number"
                                                        name="questionsLimitYearlyPrice"
                                                        value={planData.questionsLimitYearlyPrice}
                                                        onChange={(e) => handleInputChange(e, 'questionsLimitYearlyPrice')}
                                                        placeholder="Enter yearly price"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Create Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPlan;
