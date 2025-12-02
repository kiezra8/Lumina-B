import { Home, User, ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MobileNav = () => {
    const { toggleCart } = useCart();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center md:hidden z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            <button className="flex flex-col items-center text-pink-600 transition-colors p-2">
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors p-2">
                <User className="w-6 h-6" />
                <span className="text-[10px] font-medium mt-1">Account</span>
            </button>
            <button
                onClick={() => toggleCart(true)}
                className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors p-2"
            >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-[10px] font-medium mt-1">Cart</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors p-2">
                <Menu className="w-6 h-6" />
                <span className="text-[10px] font-medium mt-1">Menu</span>
            </button>
        </div>
    );
};

export default MobileNav;
