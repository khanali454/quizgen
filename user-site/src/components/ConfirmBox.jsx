const ConfirmBox = ({ buttonText = "Confirm",message, onConfirm, onCancel }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center" style={{background:"rgba(0,0,0,0.3)"}}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <p className="text-lg font-semibold mb-4">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        {buttonText}
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;