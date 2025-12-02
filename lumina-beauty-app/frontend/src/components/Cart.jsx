import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
    } = useCart();

    const formatCurrency = (amount) => {
        return 'Ugshs ' + amount.toLocaleString();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => toggleCart(false)}
            />

            {/* Cart Drawer */}
            <div
                className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-sky-500 to-sky-600 text-white">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Shopping Cart
                    </h2>
                    <button
                        onClick={() => toggleCart(false)}
                        className="text-gray-100 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-4 h-[calc(100%-220px)] overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/80x80/94a3b8/ffffff?text=Item';
                                    }}
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-900 mt-1">
                                        {formatCurrency(item.price)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-medium w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                    <div className="flex justify-between mb-4 text-xl font-bold text-gray-900">
                        <span>Subtotal</span>
                        <span>{formatCurrency(getCartTotal())}</span>
                    </div>
                    <button
                        disabled={cart.length === 0}
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-md shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Proceed to Checkout
                    </button>
                    <div className="mt-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Need help with your order?</p>
                        <a
                            href="tel:+256702370441"
                            className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                        >
                            📞 Call +256702370441
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
