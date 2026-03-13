import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Trash2, LogOut, Plus, Pencil, X, Image, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateProducts, SERVICES_TEMPLATE, CATEGORIES } from '../lib/templates';

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSaved }) {
    const isEdit = !!product?.id;
    const [form, setForm] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category: product?.category || CATEGORIES[0],
        rating: product?.rating || 4.5,
        image: product?.image || '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.image || '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!form.name || !form.price) {
            setError('Name and price are required.');
            return;
        }
        setSaving(true);
        setError('');
        try {
            let imageUrl = form.image;

            // Upload image if a new file was selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `product_${Date.now()}.${fileExt}`;
                const { error: uploadError, data: uploadData } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, imageFile, { upsert: true });
                if (uploadError) throw uploadError;
                const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
                imageUrl = urlData.publicUrl;
            }

            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                category: form.category,
                rating: Number(form.rating),
                image: imageUrl,
            };

            if (isEdit) {
                const { error } = await supabase.from('products').update(payload).eq('id', product.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('products').insert([payload]);
                if (error) throw error;
            }

            onSaved();
            onClose();
        } catch (e) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                {/* Modal Header */}
                <div className="bg-gray-900 text-white flex items-center justify-between p-6">
                    <h3 className="text-xl font-black">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition"><X className="w-5 h-5" /></button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Image Upload */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 block">Product Image</label>
                        <div className="relative h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden group cursor-pointer hover:border-gray-400 transition">
                            {imagePreview ? (
                                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Image className="w-8 h-8 mb-2" />
                                    <span className="text-sm font-bold">Click to upload image</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
                                <span className="text-white font-bold text-sm">Change Image</span>
                            </div>
                            <input type="file" accept="image/*" onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        </div>

                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 block">Product Name *</label>
                        <input
                            type="text"
                            placeholder="e.g. Lumina Rose Serum"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 block">Description</label>
                        <textarea
                            rows={3}
                            placeholder="e.g. A premium formula for everyday glow..."
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 block">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 block">Price (Ugx) *</label>
                        <input
                            type="number"
                            placeholder="e.g. 45000"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2 block">Rating (0–5)</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={form.rating}
                            onChange={(e) => setForm({ ...form, rating: e.target.value })}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-100 p-6 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 py-3 rounded-2xl bg-gray-900 text-white font-black hover:bg-sky-600 transition flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Product'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

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
