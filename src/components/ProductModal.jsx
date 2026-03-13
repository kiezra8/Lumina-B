import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CATEGORIES } from '../lib/templates';

export function ProductModal({ product, onClose, onSaved }) {
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

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `product_${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
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
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={e => e.stopPropagation()}
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
