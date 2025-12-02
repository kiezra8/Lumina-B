import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import api from '../services/api';

const Providers = ({ onSelectProvider }) => {
    const [providers, setProviders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProviders();
    }, [filter]);

    const fetchProviders = async () => {
        try {
            const params = filter !== 'All' ? { specialty: filter, limit: 12 } : { limit: 12 };
            const response = await api.get('/providers', { params });
            setProviders(response.data);
        } catch (error) {
            console.error('Error fetching providers:', error);
            // Fallback to mock data
            setProviders(getMockProviders(filter));
        } finally {
            setLoading(false);
        }
    };

    const filterButtons = ['All', 'Hair', 'Nails', 'Barber', 'Makeup'];

    return (
        <div className="provider-section-bg rounded-2xl p-8 relative">
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Top Service Providers</h2>
                        </div>
                        <p className="text-white/90 text-sm ml-4 drop-shadow">
                            ✨ Certified professionals ready to serve you
                        </p>
                    </div>

                    {/* Provider Filters */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {filterButtons.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`filter-btn px-5 py-2.5 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-bold whitespace-nowrap border-2 border-white/30 hover:bg-white/30 transition-all ${filter === category ? 'active' : ''
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-white">Loading providers...</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {providers.map((provider) => (
                            <div
                                key={provider._id || provider.id}
                                onClick={() => onSelectProvider(provider)}
                                className="provider-card rounded-xl p-4 cursor-pointer"
                            >
                                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-pink-100 to-purple-100 relative">
                                    <img
                                        src={provider.image}
                                        className="w-full h-full object-cover"
                                        alt={provider.name}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/150x150/cbd5e1/ffffff?text=User';
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 neon-badge text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {provider.specialty}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-sm text-gray-900 line-clamp-1 mb-1">
                                        {provider.name}
                                    </p>
                                    <div className="flex items-center justify-center gap-1 text-xs text-yellow-600 mb-2">
                                        <Star className="w-3 h-3 fill-yellow-500" />
                                        <span className="font-bold">{provider.rating}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 bg-white/50 rounded-full px-2 py-1 inline-block">
                                        Verified Pro
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {providers.length === 0 && !loading && (
                    <div className="text-center py-8 text-white">
                        No providers found for this category.
                    </div>
                )}
            </div>
        </div>
    );
};

// Mock data generator
const getMockProviders = (specialty) => {
    const specialties = ['Hair', 'Nails', 'Barber', 'Makeup', 'Skincare', 'Massage'];
    const providers = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Provider ${i + 1}`,
        location: 'Uganda',
        rating: (4 + Math.random()).toFixed(1),
        specialty: specialty === 'All'
            ? specialties[Math.floor(Math.random() * specialties.length)]
            : specialty,
        bio: 'Experienced professional dedicated to bringing out your best look. Certified and vetted by Lumina Beauty.',
        image: `https://placehold.co/150x150/0ea5e9/ffffff?text=P${i + 1}`,
    }));

    return specialty === 'All'
        ? providers
        : providers.filter(p => p.specialty === specialty);
};

export default Providers;
