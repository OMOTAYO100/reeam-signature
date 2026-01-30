import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';

const Home = () => {
  const { products } = useShop();
  
  const getCategorySlice = (category) => {
    return products.filter(p => p.category === category).slice(0, 4);
  };

  const menProducts = getCategorySlice('men');
  const womenProducts = getCategorySlice('women');
  const unisexProducts = getCategorySlice('unisex');

  const FeaturedSection = ({ title, items, link, id }) => (
    <section id={id} className="py-16 border-b border-gray-100 last:border-0 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-serif text-[var(--color-primary)]">{title}</h2>
          </div>
          <Link to={link} className="flex items-center text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors font-medium">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {items.length === 0 && (
          <p className="text-gray-500 italic">Coming soon.</p>
        )}
      </div>
    </section>
  );

  const handleScrollToMen = () => {
    const element = document.getElementById('men-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-8 animate-fade-in-up">
            <h1 className="text-5xl font-bold font-serif leading-tight text-white sm:text-7xl">
              Redefining <br />
              <span className="text-[var(--color-accent)]">Casual Luxury</span>
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Modern silhouettes for the contemporary youth. Minimalist, premium, and undeniably you.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                onClick={handleScrollToMen}
                className="bg-[var(--color-primary)] text-white hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 border border-transparent"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedSection id="men-section" title="Men's Collection" items={menProducts} link="/men" />
      <FeaturedSection title="Women's Collection" items={womenProducts} link="/women" />
      <FeaturedSection title="Unisex Collection" items={unisexProducts} link="/unisex" />

      <footer className="bg-[var(--color-primary)] text-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Reeam Signature</h2>
          <p className="text-gray-400">© {new Date().getFullYear()} Reeam Signature. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
