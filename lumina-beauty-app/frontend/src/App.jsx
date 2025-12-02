import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Providers from './components/Providers';
import Products from './components/Products';
import Cart from './components/Cart';
import BookingModal from './components/BookingModal';
import ProviderModal from './components/ProviderModal';
import Alert from './components/Alert';
import MobileNav from './components/MobileNav';
import ContactButton from './components/ContactButton';

function App() {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [alert, setAlert] = useState(null);

    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => setAlert(null), 3000);
    };

    const openBookingModal = (service) => {
        setSelectedService(service);
    };

    const closeBookingModal = () => {
        setSelectedService(null);
    };

    const openProviderModal = (provider) => {
        setSelectedProvider(provider);
    };

    const closeProviderModal = () => {
        setSelectedProvider(null);
    };

    return (
        <Router>
            <CartProvider>
                <div className="min-h-screen bg-gray-50">
                    <Header />

                    <main className="max-w-[1500px] mx-auto px-4 py-6 space-y-8 pb-20">
                        <Hero />
                        <Services onBookService={openBookingModal} />
                        <Providers onSelectProvider={openProviderModal} />
                        <Products />
                    </main>

                    <Cart />
                    <MobileNav />

                    {selectedService && (
                        <BookingModal
                            service={selectedService}
                            onClose={closeBookingModal}
                            onSuccess={() => {
                                showAlert('Appointment request sent!');
                                closeBookingModal();
                            }}
                        />
                    )}

                    {selectedProvider && (
                        <ProviderModal
                            provider={selectedProvider}
                            onClose={closeProviderModal}
                            onBook={() => {
                                showAlert('Booking request sent to provider!');
                                closeProviderModal();
                            }}
                        />
                    )}

                    {alert && <Alert message={alert} />}

                    <ContactButton />
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
