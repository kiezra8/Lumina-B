import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Pencil, PlusCircle } from 'lucide-react';
import { ProductModal } from './ProductModal';

export function CategoryView({ category, products, isAdmin, onRefresh, onAddToCart, onProductClick }) {
    const [editingProduct, setEditingProduct] = useState(null); // null=none, {}=new, {id...}=edit

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-1 bg-gray-900 flex-1 rounded-full"></div>
                <h2 className="text-4xl font-black">{category}</h2>
                <div className="h-1 bg-gray-900 flex-1 rounded-full"></div>
            </div>

            {isAdmin && (
                <div className="mb-8 flex justify-center">
                    <button
                        onClick={() => setEditingProduct({ category: category, rating: 4.5 })}
                        className="bg-sky-500 text-white font-black px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-sky-600 transition"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add New Product
                    </button>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 group shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
                        <div className="aspect-square relative overflow-hidden">
                            <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm z-10 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" /> {p.rating}
                            </div>
                            {isAdmin && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setEditingProduct(p); }}
                                    className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg shadow-sm z-10 hover:bg-sky-100 text-sky-600"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                                className="absolute bottom-4 right-4 bg-white p-3 rounded-2xl shadow-xl transform translate-y-20 group-hover:translate-y-0 transition-transform duration-300 hover:bg-sky-500 hover:text-white"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 flex-1 flex flex-col cursor-pointer" onClick={() => onProductClick(p)}>
                            <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{p.name}</h4>
                            <div className="mt-auto">
                                <div className="text-lg font-black text-gray-900 mb-3">Ugshs {p.price.toLocaleString()}</div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                                    className="w-full py-2.5 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-900/10"
                                >
                                    BUY NOW
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {editingProduct && (
                <ProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSaved={onRefresh}
                />
            )}
        </motion.div>
    );
}
