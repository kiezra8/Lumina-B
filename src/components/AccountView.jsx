import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateProducts, SERVICES_TEMPLATE } from '../lib/templates';

// ─── Main AccountView ─────────────────────────────────────────────────────────
export function AccountView({ user, isAdmin, onRefresh }) {
    const [seeding, setSeeding] = useState(false);

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

    if (!user) return null;

    return (
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
                            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 max-w-lg">
                                <h4 className="font-black text-lg mb-2">Database Maintenance</h4>
                                <p className="text-gray-500 text-sm mb-6">Reset your store with 30 fresh products across all categories and default services template.</p>
                                <button
                                    onClick={seedDatabase}
                                    disabled={seeding}
                                    className="w-full bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-sky-600/20 hover:bg-sky-700 transition"
                                >
                                    {seeding ? "Seeding..." : "Reset / Seed Store Data"}
                                </button>
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
    );
}
