import { Phone, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const ContactButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = '+256702370441';

    const handleWhatsApp = () => {
        const message = encodeURIComponent('Hello! I would like to inquire about your services.');
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`, '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <>
            {/* Floating Contact Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all transform hover:scale-110 active:scale-95"
                aria-label="Contact Us"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6 animate-pulse" />
                )}
            </button>

            {/* Contact Options Menu */}
            {isOpen && (
                <div className="fixed bottom-40 md:bottom-24 right-4 md:right-8 bg-white rounded-2xl shadow-2xl z-50 p-4 w-64 animate-fade-in border border-gray-200">
                    <div className="mb-3">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Contact Us for Orders</h3>
                        <p className="text-sm text-gray-600">We're here to help you!</p>
                    </div>

                    <div className="space-y-2">
                        {/* WhatsApp Button */}
                        <button
                            onClick={handleWhatsApp}
                            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
                        >
                            <div className="bg-white/20 p-2 rounded-full">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div className="text-left flex-1">
                                <div className="font-bold text-sm">WhatsApp</div>
                                <div className="text-xs opacity-90">Chat with us</div>
                            </div>
                        </button>

                        {/* Call Button */}
                        <button
                            onClick={handleCall}
                            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
                        >
                            <div className="bg-white/20 p-2 rounded-full">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="text-left flex-1">
                                <div className="font-bold text-sm">Call Us</div>
                                <div className="text-xs opacity-90">{phoneNumber}</div>
                            </div>
                        </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            Available 24/7 for your orders
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactButton;
