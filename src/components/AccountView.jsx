import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Trash2, LogOut, Plus, Pencil, X, Image, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateProducts, SERVICES_TEMPLATE, CATEGORIES } from '../lib/templates';

import { ProductModal } from './ProductModal';

// ─── Main AccountView ─────────────────────────────────────────────────────────
export function AccountView({ user, isAdmin, products, onRefresh }) {
    const [seeding, setSeeding] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [modalProduct, setModalProduct] = useState(null); // null=closed, {}=add, {id,...}=edit
    const [filterCat, setFilterCat] = useState('All');
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    const seedDatabase = async () => {
        if (!confirm("This will replace current data with 30 fresh products. Continue?")) return;
        setSeeding(true);
        try {
            const productsTemplate = generateProducts();
            const { error: pError } = await supabase.from('products').upsert(productsTemplate, { onConflict: 'id' });
            if (pError) throw pError;
            const { error: sError } = await supabase.from('services').upsert(SERVICES_TEMPLATE, { onConflict: 'id' });
            if (sError) throw sError;
            alert("Database Seeded Successfully!");
            onRefresh();
        } catch (e) {
            console.error("Seeding failed:", e);
            alert("Seeding Error: " + e.message);
        } finally {
            setSeeding(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        setDeletingId(id);
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            onRefresh();
        } catch (e) {
            alert("Delete failed: " + e.message);
        } finally {
            setDeletingId(null);
            setConfirmDelete(null);
        }
    };

    if (!user) return null;

    const filteredProducts = filterCat === 'All'
        ? products
        : products.filter(p => p.category === filterCat);

    return (
        <>
            {/* Product Modal */}
            <AnimatePresence>
                {modalProduct !== null && (
                    <ProductModal
                        product={modalProduct}
                        onClose={() => setModalProduct(null)}
                        onSaved={onRefresh}
                    />
                )}
            </AnimatePresence>

            {/* Delete Confirm */}
            <AnimatePresence>
                {confirmDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-black mb-2">Delete Product?</h3>
                            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(confirmDelete)}
                                    disabled={deletingId === confirmDelete}
                                    className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-black hover:bg-red-600 transition"
                                >
                                    {deletingId === confirmDelete ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 mb-8">
                    {/* Header */}
                    <div className="bg-gray-900 p-12 text-white relative">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black mb-2">My Account</h2>
                            <p className="text-gray-400 font-bold">{user.email}</p>
                            {isAdmin && <span className="inline-block mt-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-black border border-sky-500/30">Administrator</span>}
                        </div>
                        <button onClick={handleLogout} className="absolute top-12 right-12 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition duration-300">
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        {/* ── ADMIN SECTION ── */}
                        {isAdmin && (
                            <section>
                                <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-sky-600">
                                    <Database className="w-6 h-6" /> Admin Controls
                                </h3>

                                {/* Top controls */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {/* Seed DB */}
                                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                        <h4 className="font-black text-lg mb-2">Database Maintenance</h4>
                                        <p className="text-gray-500 text-sm mb-6">Reset your store with 30 fresh products across all categories.</p>
                                        <button
                                            onClick={seedDatabase}
                                            disabled={seeding}
                                            className="w-full bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-sky-600/20 hover:bg-sky-700 transition"
                                        >
                                            {seeding ? "Seeding..." : "Reset / Seed Store Data"}
                                        </button>
                                    </div>
                                    {/* Add product */}
                                    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl text-white">
                                        <h4 className="font-black text-lg mb-2">Add New Product</h4>
                                        <p className="text-gray-400 text-sm mb-6">Upload images, set prices and add products to your live store instantly.</p>
                                        <button
                                            onClick={() => setModalProduct({})}
                                            className="w-full bg-white text-gray-900 font-black py-4 rounded-2xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-5 h-5" /> Add Product
                                        </button>
                                    </div>
                                </div>

                                {/* Product list with edit/delete */}
                                <div>
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                        <h4 className="font-black text-lg">Product Manager <span className="text-gray-400 font-bold">({filteredProducts.length})</span></h4>
                                        {/* Category filter */}
                                        <select
                                            value={filterCat}
                                            onChange={(e) => setFilterCat(e.target.value)}
                                            className="text-sm font-bold px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none"
                                        >
                                            <option value="All">All Categories</option>
                                            {['Perfumes, Colognes & Oils', 'Skin Care Products', 'Accessories', 'Wigs & Hair', 'Women Electrical Appliances'].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="border border-gray-100 rounded-3xl overflow-hidden">
                                        <div className="max-h-[500px] overflow-y-auto">
                                            {filteredProducts.length === 0 ? (
                                                <div className="text-center py-12 text-gray-400">
                                                    <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                                    <p className="font-bold">No products in this category.</p>
                                                </div>
                                            ) : (
                                                <table className="w-full text-sm">
                                                    <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                                                        <tr>
                                                            <th className="text-left px-4 py-3 font-black text-gray-500 text-xs uppercase tracking-wider">Product</th>
                                                            <th className="text-left px-4 py-3 font-black text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                                                            <th className="text-right px-4 py-3 font-black text-gray-500 text-xs uppercase tracking-wider">Price</th>
                                                            <th className="px-4 py-3"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredProducts.map((p, idx) => (
                                                            <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50 transition ${idx % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                                                                <td className="px-4 py-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <img
                                                                            src={p.image}
                                                                            alt={p.name}
                                                                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0 bg-gray-100"
                                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                                        />
                                                                        <span className="font-bold text-gray-800 truncate max-w-[160px]">{p.name}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 hidden md:table-cell">
                                                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{p.category}</span>
                                                                </td>
                                                                <td className="px-4 py-3 text-right font-black text-gray-900 whitespace-nowrap">
                                                                    Ugx {p.price?.toLocaleString()}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <div className="flex items-center gap-2 justify-end">
                                                                        <button
                                                                            onClick={() => setModalProduct(p)}
                                                                            className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition"
                                                                            title="Edit"
                                                                        >
                                                                            <Pencil className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setConfirmDelete(p.id)}
                                                                            className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                                                                            title="Delete"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* ── ACCOUNT SETTINGS ── */}
                        <section>
                            <h3 className="text-2xl font-black mb-6">Account Settings</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                                    <span className="font-bold">Email Notifications</span>
                                    <div className="w-12 h-6 bg-sky-600 rounded-full" />
                                </div>
                                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                                    <span className="font-bold">Two-Factor Authentication</span>
                                    <div className="w-12 h-6 bg-gray-300 rounded-full" />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
