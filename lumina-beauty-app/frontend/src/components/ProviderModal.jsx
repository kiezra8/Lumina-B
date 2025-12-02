import { X, Star, MapPin, MessageCircle, Share2, ArrowRight } from 'lucide-react';

const ProviderModal = ({ provider, onClose, onBook }) => {
    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all scale-95 opacity-0 animate-fade-in"
                style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Banner */}
                <div className="relative h-32 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    {/* Profile Image & Actions */}
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <div className="w-32 h-32 rounded-lg border-4 border-white shadow-lg overflow-hidden bg-white">
                            <img
                                src={provider.image}
                                alt={provider.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/150x150/cbd5e1/ffffff?text=User';
                                }}
                            />
                        </div>
                        <div className="flex gap-2 mb-2">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{provider.name}</h3>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                    <MapPin className="w-4 h-4 text-pink-500" />
                                    <span>{provider.location}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-4 py-4 border-y border-gray-100">
                                <div className="text-center flex-1">
                                    <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span>{provider.rating}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Rating</div>
                                </div>
                                <div className="text-center flex-1 border-x border-gray-100">
                                    <div className="text-2xl font-bold text-gray-900">150+</div>
                                    <div className="text-xs text-gray-500">Jobs Done</div>
                                </div>
                                <div className="text-center flex-1">
                                    <div className="text-2xl font-bold text-gray-900">98%</div>
                                    <div className="text-xs text-gray-500">On Time</div>
                                </div>
                            </div>

                            {/* Specialties */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold">
                                        {provider.specialty}
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                        Home Service
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{provider.bio}</p>
                            </div>

                            <button
                                onClick={onBook}
                                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-md shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                <span>Book Appointment</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderModal;
