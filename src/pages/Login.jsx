import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@reeam.com' && password === 'admin123') {
      loginAdmin();
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <div className="absolute top-24 left-4 sm:left-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-[var(--color-primary)] transition-colors">
          <ArrowLeft className="h-5 w-5 mr-1" /> Back to Home
        </Link>
      </div>  
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-center mb-6 text-[var(--color-primary)]">Admin Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none transition-colors"
                placeholder="Email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] outline-none transition-colors"
                placeholder="Password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" variant="primary">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
