import { useTranslation } from 'react-i18next';

const PlanFeaturesList = ({ plan }) => {
    const { t, i18n } = useTranslation('global');
    const isArabic = i18n.language === 'ar';

    const features = [
        t('plans.features.files_upload_limit', { count: plan.files_upload_limit }),
        t('plans.features.formats', { formats: plan.upload_formats.join(', ') }),
        t('plans.features.requests_limit', { count: plan.requests }),
        t('plans.features.questions_per_request', { count: plan.mcq_per_request }),
        t('plans.features.question_types', {
            types: plan.mcq_types.map(type => t(`plans.question_types.${type}`)).join(', ')
        }),
        t('plans.features.difficulty_levels', {
            levels: plan.difficulty_levels.map(level => t(`plans.difficulty_levels.${level}`)).join(', ')
        }),
        ...(plan.specific_subject ? [t('plans.features.specific_subject')] : []),
        ...(plan.online_test ? [t('plans.features.online_test')] : []),
        t('plans.features.language_support', {
            languages: plan.language_support.join(', ')
        }),
        t('plans.features.view_quizzes'),
        t('plans.features.copy_quizzes'),
        t('plans.features.download_formats', {
            formats: plan.download_formats.join(', ')
        })
    ].filter(Boolean);

    return (
        <ul className="space-y-4 text-left mb-6">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                        className="w-5 h-5 text-white flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span dir={isArabic ? 'rtl' : 'ltr'}>
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    );
};


export default PlanFeaturesList;