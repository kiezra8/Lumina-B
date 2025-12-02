import { Search, ShoppingCart, MapPin, Menu, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { getCartCount, toggleCart } = useCart();

    return (
        <header className="sticky top-0 z-50">
            {/* Top Nav with Luxurious Sky Blue */}
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white">
                <div className="max-w-[1500px] mx-auto px-4">
                    <div className="flex items-center gap-4 h-14">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-1.5 rounded">
                                <Sparkles className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold">Lumina</span>
                        </div>

                        {/* Delivery Location */}
                        <button className="hidden md:flex items-center gap-1 px-2 py-1 hover:bg-sky-600 rounded transition-colors">
                            <MapPin className="w-4 h-4" />
                            <div className="text-left">
                                <div className="text-xs text-gray-100">Deliver to</div>
                                <div className="text-sm font-bold">Your Location</div>
                            </div>
                        </button>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-3xl">
                            <div className="flex items-center">
                                <select className="hidden md:block bg-gray-100 text-gray-900 px-3 py-2.5 rounded-l-md border-r border-gray-300 text-sm focus:outline-none">
                                    <option>All</option>
                                    <option>Hair Care</option>
                                    <option>Skincare</option>
                                    <option>Makeup</option>
                                    <option>Services</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search Lumina Beauty"
                                    className="flex-1 px-4 py-2.5 text-gray-900 focus:outline-none md:rounded-none rounded-l-md"
                                />
                                <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-4 py-2.5 rounded-r-md transition-all">
                                    <Search className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button className="hidden md:flex flex-col items-start hover:bg-sky-600 px-2 py-1 rounded transition-colors">
                                <span className="text-xs text-gray-100">Hello, Sign in</span>
                                <span className="text-sm font-bold">Account & Lists</span>
                            </button>

                            <button className="hidden md:flex flex-col items-start hover:bg-sky-600 px-2 py-1 rounded transition-colors">
                                <span className="text-xs text-gray-100">Returns</span>
                                <span className="text-sm font-bold">& Orders</span>
                            </button>

                            <button
                                onClick={() => toggleCart(true)}
                                className="relative flex items-center gap-1 hover:bg-sky-600 px-2 py-1 rounded transition-colors"
                            >
                                <div className="relative">
                                    <ShoppingCart className="w-7 h-7" />
                                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                </div>
                                <span className="text-sm font-bold hidden md:block">Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Nav */}
            <div className="bg-sky-700 text-white text-sm">
                <div className="max-w-[1500px] mx-auto px-4">
                    <div className="flex items-center gap-6 h-10 overflow-x-auto no-scrollbar">
                        <button className="flex items-center gap-1 hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">
                            <Menu className="w-4 h-4" />
                            <span className="font-bold">All</span>
                        </button>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Today's Deals</a>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Best Sellers</a>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Hair & Wigs</a>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Skincare</a>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Makeup</a>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Home Services</a>
                        <a href="#" className="hover:bg-sky-600 px-2 py-1 rounded whitespace-nowrap">Gift Cards</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
