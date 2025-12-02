import { useState } from 'react';
import { X, CalendarCheck } from 'lucide-react';

const BookingModal = ({ service, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would make an API call to create the booking
        console.log('Booking:', { service, ...formData });
        onSuccess();
    };

    const formatCurrency = (amount) => {
        return 'Ugshs ' + amount.toLocaleString();
    };

    return (
        <div
            className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full md:max-w-md bg-white rounded-t-2xl md:rounded-xl shadow-2xl overflow-hidden transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5" />
                        Schedule Service
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
                    {/* Service Details */}
                    <div className="flex gap-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-20 h-20 object-cover rounded"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/80x80/e2e8f0/ffffff?text=Service';
                            }}
                        />
                        <div>
                            <h4 className="font-bold text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600">{service.time}</p>
                            <p className="text-lg font-bold text-pink-600 mt-1">
                                {formatCurrency(service.price)}
                            </p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Date
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Time
                            </label>
                            <select
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none bg-white"
                            >
                                <option value="">Choose a time slot...</option>
                                <option value="9AM-11AM">09:00 AM - 11:00 AM</option>
                                <option value="12PM-2PM">12:00 PM - 02:00 PM</option>
                                <option value="3PM-5PM">03:00 PM - 05:00 PM</option>
                                <option value="6PM-8PM">06:00 PM - 08:00 PM</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Service Address
                            </label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="House/Apt No, Street, City"
                                rows="2"
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3.5 rounded-md shadow-md transition-all active:scale-[0.99]"
                        >
                            Confirm Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
