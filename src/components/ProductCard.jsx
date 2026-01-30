import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();

  return (
    <div className="group relative flex flex-col gap-3">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent">
          <Button 
            variant="accent" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg font-medium leading-none text-[var(--color-primary)] font-serif">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="font-medium text-[var(--color-accent)]">
          ₦{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
