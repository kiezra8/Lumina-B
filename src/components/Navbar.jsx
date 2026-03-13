import React from 'react';
import { Sparkles, Search, ShoppingCart } from 'lucide-react';

export default function Navbar({ view, setView, user, cartCount, onToggleCart, onSearch }) {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => setView('home')}>
                    <div className="bg-gradient-to-r from-sky-400 to-pink-500 p-2 rounded-xl shadow-lg shadow-pink-500/20">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 hidden sm:block">
                        Sera <span className="text-sky-500">Beauty Shop</span>
                    </h1>
                    <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 sm:hidden">
                        S<span className="text-sky-500">BS</span>
                    </h1>
                </div>

                <div className="flex-1 max-w-md mx-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 rounded-full py-2 pl-10 pr-4 transition-all duration-300 text-sm outline-none"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {['home', 'services', 'products'].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`text-sm font-bold uppercase tracking-wide transition-colors ${view === v ? 'text-sky-600' : 'text-gray-500 hover:text-sky-600'}`}
                        >
                            {v === 'products' ? 'Shop' : v}
                        </button>
                    ))}
                    <button
                        onClick={() => setView(user ? 'account' : 'login')}
                        className={`text-sm font-bold uppercase tracking-wide transition-colors ${view === 'account' ? 'text-sky-600' : 'text-gray-500 hover:text-sky-600'}`}
                    >
                        {user ? 'Account' : 'Sign In'}
                    </button>
                </nav>

                <div className="flex items-center gap-4">
                    <button onClick={onToggleCart} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
                        <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-sky-600 transition-colors" />
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                            {cartCount}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
