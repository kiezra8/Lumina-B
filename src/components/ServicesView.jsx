import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SERVICES = [
    {
        id: 1,
        name: "Braiding",
        price: 150000,
        time: "4-6 hrs",
        description: "Beautiful hand-crafted braids including box braids, cornrows, Fulani braids and more.",
        image: "https://images.unsplash.com/photo-1605218427360-36390f8584b0?w=600"
    },
    {
        id: 2,
        name: "Shaving for Men",
        price: 20000,
        time: "45 mins",
        description: "Professional clean shaves, fades, and beard trims by experienced barbers.",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600"
    },
    {
        id: 3,
        name: "Pedicure",
        price: 45000,
        time: "1.5 hrs",
        description: "Luxurious foot care including soaking, scrubbing, nail trimming and polish.",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600"
    },
    {
        id: 4,
        name: "Manicure",
        price: 35000,
        time: "1 hr",
        description: "Complete hand care with cuticle treatment, nail shaping and your choice of polish.",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600"
    },
    {
        id: 5,
        name: "Wig Installation",
        price: 80000,
        time: "1-2 hrs",
        description: "Flawless frontal and full lace wig installs with natural-looking hairline finishing.",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600"
    },
    {
        id: 6,
        name: "Lashes Fixation",
        price: 50000,
        time: "1 hr",
        description: "Classic, volume, and mega volume lash extensions applied by certified lash technicians.",
        image: "https://images.unsplash.com/photo-1583001838473-b1939109772b?w=600"
    },
    {
        id: 7,
        name: "Make Up",
        price: 100000,
        time: "1-2 hrs",
        description: "Full glam, natural, bridal and event makeup done by professional artists.",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600"
    },
];

export function ServicesView({ isAdmin, services, onRefresh }) {
    const [uploadingSvc, setUploadingSvc] = useState(null);

    // Filter local template if DB isn't seeded yet
    const displayServices = services && services.length > 0 ? services : SERVICES;

    const handleServiceImageUpload = async (svcId, e) => {
        const file = e.target.files[0];
        if(!file) return;

        setUploadingSvc(svcId);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `svc_${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file, { upsert: true });
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
            const imageUrl = urlData.publicUrl;

            const { error } = await supabase.from('services').update({ image: imageUrl }).eq('id', svcId);
            if (error) throw error;

            onRefresh();
        } catch (err) {
            alert("Error uploading service image: " + err.message);
        } finally {
            setUploadingSvc(null);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-sm font-bold mb-4">
                    ✨ Professional & Certified
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                    Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Services</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">From braiding to beauty, our certified professionals deliver luxury salon experiences at your convenience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayServices.map((s, idx) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                    >
                        <div className="h-64 overflow-hidden relative">
                            <img src={s.image} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${uploadingSvc === s.id ? 'opacity-50 blur-sm' : ''}`} alt={s.name} />
                            
                            {isAdmin && (
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="relative bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white text-gray-900 transition flex items-center justify-center cursor-pointer">
                                        <ImageIcon className="w-5 h-5 mr-2" />
                                        <span className="text-sm font-bold">{uploadingSvc === s.id ? 'Uploading...' : 'Change'}</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleServiceImageUpload(s.id, e)} 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                            disabled={uploadingSvc === s.id}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">{s.name}</h3>
                                    <div className="flex items-center gap-2 text-amber-500 font-bold mt-1">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-sm">4.9 Rating</span>
                                        <span className="text-gray-400 font-normal text-xs">· {s.time}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-gray-900">Ugx {s.price.toLocaleString()}</div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.description}</p>
                            <button
                                onClick={() => window.open(`https://wa.me/256753280593?text=I'd like to book: ${s.name}`, '_blank')}
                                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-gray-900/20"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
