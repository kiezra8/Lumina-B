import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export function AuthView({ mode, setView }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resetMode, setResetMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (resetMode) {
                const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                    redirectTo: window.location.origin,
                });
                if (error) throw error;
                setSuccess("Password reset email sent! Check your inbox.");
                setResetMode(false);
                return;
            }

            if (mode === 'login') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email.trim(),
                    password: formData.password,
                });
                if (error) throw error;
                if (data.user) setView('account');
            } else {
                if (formData.password.length < 6) throw new Error("Password must be at least 6 characters.");
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email.trim(),
                    password: formData.password,
                    options: { data: { full_name: formData.name } }
                });
                if (error) throw error;
                if (data.user && !data.session) {
                    setSuccess("Account created! Please check your email to confirm your account, then log in.");
                } else if (data.session) {
                    setView('account');
                } else {
                    setSuccess("Account created! Please check your email to confirm.");
                }
            }
        } catch (err) {
            // Map common Supabase errors to user-friendly messages
            let msg = err.message;
            if (msg.includes('Invalid login credentials')) msg = 'Incorrect email or password. Please try again.';
            else if (msg.includes('Email not confirmed')) msg = 'Please confirm your email first. Check your inbox.';
            else if (msg.includes('User already registered')) msg = 'An account with this email already exists. Try logging in.';
            else if (msg.includes('rate limit')) msg = 'Too many attempts. Please wait a moment and try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container mx-auto px-4 py-8 max-w-xl"
        >
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-black mb-2 text-gray-900">
                        {resetMode ? 'Reset Password' : mode === 'login' ? 'Welcome Back 👋' : 'Join Lumina ✨'}
                    </h2>
                    <p className="text-gray-500 font-medium">
                        {resetMode
                            ? "Enter your email and we'll send a reset link."
                            : mode === 'login'
                                ? 'Sign in to access your profile and orders.'
                                : 'Create an account to start shopping beauty.'}
                    </p>
                </div>

                {/* Error */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium mb-6"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-medium mb-6"
                        >
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{success}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name (register only) */}
                    {!resetMode && mode === 'register' && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-300 outline-none transition font-medium"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-300 outline-none transition font-medium"
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    {/* Password */}
                    {!resetMode && (
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formData.password}
                                className="w-full p-5 pr-14 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-300 outline-none transition font-medium"
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    )}

                    {/* Forgot password link */}
                    {!resetMode && mode === 'login' && (
                        <div className="text-right">
                            <button type="button" onClick={() => { setResetMode(true); setError(''); setSuccess(''); }}
                                className="text-sm font-bold text-sky-600 hover:text-sky-700 transition">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-900/20 hover:bg-gray-800 transition transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Processing...
                            </span>
                        ) : resetMode ? "Send Reset Link" : mode === 'login' ? "SIGN IN" : "CREATE ACCOUNT"}
                    </button>
                </form>

                {/* Footer links */}
                <div className="mt-8 text-center text-sm font-medium text-gray-400 space-y-3">
                    {resetMode ? (
                        <p>
                            Remember your password?{' '}
                            <span onClick={() => { setResetMode(false); setError(''); setSuccess(''); }}
                                className="text-sky-600 font-bold cursor-pointer hover:text-sky-700">
                                Back to Login
                            </span>
                        </p>
                    ) : mode === 'login' ? (
                        <p>Don't have an account?{' '}
                            <span onClick={() => { setView('register'); setError(''); }} className="text-sky-600 font-bold cursor-pointer hover:text-sky-700">Register now</span>
                        </p>
                    ) : (
                        <p>Already have an account?{' '}
                            <span onClick={() => { setView('login'); setError(''); }} className="text-sky-600 font-bold cursor-pointer hover:text-sky-700">Login here</span>
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
