import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CATEGORIES = [
    "Perfumes, Colognes & Oils",
    "Skin Care Products",
    "Accessories",
    "Wigs & Hair",
    "Women Electrical Appliances",
];

const CATEGORY_META = {
    "Perfumes, Colognes & Oils": {
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800",
        sub: "Fragrances · Mists · Essential Oils",
        emoji: "🌸",
    },
    "Skin Care Products": {
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        sub: "Serums · Moisturizers · Cleansers",
        emoji: "✨",
    },
    "Accessories": {
        image: "https://images.unsplash.com/photo-1535633302723-997f858509ec?w=800",
        sub: "Watches · Bangles · Earrings & more",
        emoji: "💎",
    },
    "Wigs & Hair": {
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
        sub: "Lace Frontals · Full Wigs · Extensions",
        emoji: "👸",
    },
    "Women Electrical Appliances": {
        image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800",
        sub: "Hair Dryers · Straighteners · Curlers",
        emoji: "⚡",
    },
};

export function ProductsView({ products, settings, isAdmin, onRefresh, onCategorySelect, onSeed }) {
    const productCounts = {};
    const [uploadingCat, setUploadingCat] = useState(null);

    CATEGORIES.forEach(c => { productCounts[c] = products.filter(p => p.category === c).length; });

    const handleImageUpload = async (cat, e) => {
        const file = e.target.files[0];
        if(!file) return;

        setUploadingCat(cat);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `cat_${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file, { upsert: true });
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
            const imageUrl = urlData.publicUrl;

            const { error } = await supabase.from('site_settings').upsert({ key: `cat_img_${cat}`, value: imageUrl }, { onConflict: 'key' });
            if (error) throw error;

            onRefresh();
        } catch (err) {
            alert("Error uploading category image: " + err.message);
        } finally {
            setUploadingCat(null);
        }
    };

    if (products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Database className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-3xl font-black mb-4">Store Empty</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">No products found in the database. Head to Account section to seed default data.</p>
                <button onClick={onSeed} className="bg-sky-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-sky-600/20">Check Database Again</button>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-sm font-bold mb-4">
                    🛍️ Curated for You
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                    Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-600">Category</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">Explore our full range of beauty products, accessories, and appliances — all delivered to your door.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CATEGORIES.map((cat, idx) => {
                    const meta = CATEGORY_META[cat];
                    const bgImage = settings[`cat_img_${cat}`] || meta.image;

                    return (
                        <motion.div
                            key={cat}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => onCategorySelect(cat)}
                            className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-2xl transition-all duration-500 hover:-translate-y-2 border-4 border-white ${idx === 4 ? 'md:col-span-2' : ''}`}
                            style={{ height: idx === 4 ? '280px' : '320px' }}
                        >
                            <img src={bgImage} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${uploadingCat === cat ? 'opacity-50 blur-sm' : ''}`} alt={cat} />
                            
                            {isAdmin && (
                                <div className="absolute top-6 right-6 z-20">
                                    <div className="relative bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white text-gray-900 transition flex items-center justify-center cursor-pointer">
                                        <ImageIcon className="w-5 h-5 mr-2" />
                                        <span className="text-sm font-bold">{uploadingCat === cat ? 'Uploading...' : 'Change Image'}</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={(e) => handleImageUpload(cat, e)} 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                            onClick={e => e.stopPropagation()} 
                                            disabled={uploadingCat === cat}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-10">
                                <div className="text-4xl mb-2">{meta.emoji}</div>
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-2xl">{cat}</h3>
                                <p className="text-gray-300 text-sm mb-4 font-medium">{meta.sub}</p>
                                <div className="flex items-center gap-4">
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                        <span className="text-white font-bold text-sm tracking-wide">Explore Collection</span>
                                        <ChevronRight className="w-4 h-4 text-white" />
                                    </div>
                                    {productCounts[cat] > 0 && (
                                        <span className="text-white/70 text-xs font-bold">{productCounts[cat]} items</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
