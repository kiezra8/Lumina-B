const Hero = () => {
    return (
        <div className="relative rounded-lg overflow-hidden h-64 md:h-80 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 glow-effect">
            <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=1200"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                alt="Beauty Background"
                onError={(e) => {
                    e.target.src = 'https://placehold.co/1200x400/1e293b/ffffff?text=LUMINA';
                }}
            />
            <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
                <div className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    LIMITED TIME OFFER
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                    Premium Beauty Services at Your Doorstep
                </h1>
                <p className="text-gray-200 mb-6 text-sm md:text-base">
                    Shop exclusive products or book certified professionals for home services
                </p>
                <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 rounded-md font-bold shadow-lg transition-all active:scale-95">
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default Hero;
