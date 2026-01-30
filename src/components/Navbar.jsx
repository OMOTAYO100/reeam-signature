import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useShop();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Unisex', path: '/unisex' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <button 
          className="p-2 lg:hidden text-[var(--color-primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Reeam Signature" className="h-12 w-auto object-contain mix-blend-multiply" />
          <span className="hidden text-xl font-bold font-serif tracking-tight sm:block">Reeam Signature</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${
                location.pathname === link.path ? 'text-[var(--color-primary)]' : 'text-gray-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative p-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] text-white">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-[var(--color-background)]">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)] rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
