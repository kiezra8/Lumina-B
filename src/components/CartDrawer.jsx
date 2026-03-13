import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ShoppingCart } from 'lucide-react';

export function CartDrawer({ isOpen, onClose, cart, setCart, onCheckout }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const updateQty = (id, delta) => {
        setCart(prev =>
            prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />
                )}
            </AnimatePresence>
            <motion.div
                initial={{ x: '100%' }} animate={{ x: isOpen ? 0 : '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
            >
                <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6" />
                        <h2 className="text-xl font-black tracking-tight">Your Cart</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition"><X className="w-6 h-6" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300 opacity-50">
                            <ShoppingCart className="w-20 h-20 mb-4" />
                            <p className="font-black">YOUR CART IS EMPTY</p>
                        </div>
                    ) : cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                            <img src={item.image} className="w-20 h-20 object-cover rounded-xl" />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-black truncate mb-1">{item.name}</h4>
                                <div className="text-sky-600 font-black text-sm mb-3">Ugshs {item.price.toLocaleString()}</div>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold">-</button>
                                    <span className="font-black text-sm">{item.quantity}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-white border-t space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-black text-sm uppercase">Total</span>
                        <span className="text-2xl font-black">Ugshs {total.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={onCheckout}
                        disabled={cart.length === 0}
                        className="w-full py-5 bg-pink-500 text-white font-black rounded-2xl shadow-xl shadow-pink-500/30 hover:bg-pink-600 transition tracking-widest uppercase active:scale-[0.98]"
                    >
                        Order on WhatsApp
                    </button>
                </div>
            </motion.div>
        </>
    );
}
