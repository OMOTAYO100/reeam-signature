import React from 'react';
import { Trash2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal } = useShop();

  const handleCheckout = () => {
    const phoneNumber = "2348163294198";
    
    let message = "Hello Reeam Signature, I would like to place an order for:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;
    });
    
    message += `\n*Total Amount: ₦${getCartTotal().toLocaleString()}*`;
    message += "\n\nPlease confirm my order.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-[var(--color-primary)] mb-8">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your bag is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/men">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="flex py-6 px-4 sm:px-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">₦{item.price.toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty 1</p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            className="font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)] flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-base font-medium text-gray-900">Order Total</div>
                  <div className="text-base font-medium text-gray-900">₦{getCartTotal().toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={handleCheckout} 
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none"
                >
                  <MessageCircle className="h-5 w-5" /> Checkout on WhatsApp
                </Button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  You'll be redirected to WhatsApp to confirm your order details.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
