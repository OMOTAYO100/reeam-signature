import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Shop = ({ category }) => {
  const { products } = useShop();
  
  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;

  const title = category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` : 'All Products';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)]">{title}</h1>
          <p className="mt-4 text-gray-500 max-w-2xl">
            Explore our latest collection of premium streetwear, designed for comfort and style.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No products found in this collection.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
