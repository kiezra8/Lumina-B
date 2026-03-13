import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function SearchView({ query, products, onAddToCart }) {
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-black mb-8 text-gray-900">Search Results for "{query}" <span className="text-gray-400 ml-2">({filtered.length})</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filtered.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-50 shadow-sm flex flex-col h-full">
                        <img src={p.image} className="aspect-square object-cover" />
                        <div className="p-4 flex-1 flex flex-col">
                            <h4 className="text-xs font-bold line-clamp-2 mb-2">{p.name}</h4>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="font-black text-sm text-sky-600">Ugshs {p.price.toLocaleString()}</span>
                                <button onClick={() => onAddToCart(p)} className="p-2 bg-gray-900 text-white rounded-lg"><Plus className="w-3 h-3" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
