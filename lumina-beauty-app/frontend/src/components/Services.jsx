import { useState, useEffect } from 'react';
import api from '../services/api';

const Services = ({ onBookService }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get('/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            // Fallback to mock data if API fails
            setServices(mockServices);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return 'Ugshs ' + amount.toLocaleString();
    };

    if (loading) {
        return <div className="text-center py-8">Loading services...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Book Home Services</h2>
                <a href="#" className="text-sm text-pink-600 hover:text-pink-700 hover:underline font-medium">
                    See all
                </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {services.slice(0, 10).map((service) => (
                    <div
                        key={service._id || service.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden futuristic-card cursor-pointer"
                    >
                        <div className="relative h-32 bg-gray-100">
                            <img
                                src={service.image}
                                className="w-full h-full object-cover"
                                alt={service.name}
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/400x300/e2e8f0/ffffff?text=Service';
                                }}
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900">
                                {service.time}
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-bold text-sm text-gray-900 mb-1">{service.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-base font-bold text-gray-900">
                                    {formatCurrency(service.price)}
                                </span>
                                <button
                                    onClick={() => onBookService(service)}
                                    className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                                >
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Mock data fallback
const mockServices = [
    { id: '101', name: "Box Braids", price: 150000, time: "5 hrs", type: "braids", image: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?auto=format&fit=crop&q=80&w=400" },
    { id: '102', name: "Knotless Braids", price: 180000, time: "6 hrs", type: "braids", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400" },
    { id: '103', name: "Cornrows Styling", price: 80000, time: "3 hrs", type: "braids", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400" },
    { id: '104', name: "Passion Twists", price: 160000, time: "5 hrs", type: "twists", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400" },
    { id: '105', name: "Faux Locs", price: 200000, time: "7 hrs", type: "locs", image: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=400" },
    { id: '109', name: "Pedicure & Foot Spa", price: 45000, time: "1.5 hrs", type: "nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400" },
    { id: '110', name: "Manicure & Nail Art", price: 35000, time: "1 hr", type: "nails", image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=400" },
    { id: '111', name: "Gel Nails", price: 60000, time: "1.5 hrs", type: "nails", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=400" },
    { id: '107', name: "Afro Styling & Shaping", price: 50000, time: "2 hrs", type: "natural", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400" },
    { id: '108', name: "Silk Press", price: 90000, time: "3 hrs", type: "styling", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400" },
];

export default Services;
