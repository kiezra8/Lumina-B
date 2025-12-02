import { CheckCircle } from 'lucide-react';

const Alert = ({ message }) => {
    return (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 p-4 bg-green-600 text-white rounded-lg shadow-2xl z-[90] transition-opacity duration-300 animate-fade-in">
            <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Alert;
