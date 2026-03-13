import React from 'react';
import { Home as HomeIcon, Scissors, ShoppingBag, User } from 'lucide-react';

export function MobileNav({ view, setView, user }) {
    const tabs = [
        { id: 'home', icon: HomeIcon, label: 'Home' },
        { id: 'services', icon: Scissors, label: 'Services' },
        { id: 'products', icon: ShoppingBag, label: 'Shop' },
        { id: 'account', icon: User, label: user ? 'Account' : 'Sign In' }
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-4 h-16">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setView(tab.id === 'account' && !user ? 'login' : tab.id)}
                        className={`flex flex-col items-center justify-center transition-all ${view === tab.id || (tab.id === 'account' && (view === 'login' || view === 'register')) ? 'text-sky-600 scale-110' : 'text-gray-400'}`}
                    >
                        <tab.icon className={`w-6 h-6 mb-1 ${view === tab.id ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
