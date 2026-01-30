import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Classic Oversized Tee",
    price: 45000,
    category: "unisex",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    description: "Premium cotton oversized t-shirt in charcoal."
  },
  {
    id: 2,
    name: "Pleated Tapered Trousers",
    price: 120000,
    category: "men",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974&auto=format&fit=crop",
    description: "Elegant pleated trousers for a relaxed silhouette."
  },
  {
    id: 3,
    name: "Silk Blend Blouse",
    price: 150000,
    category: "women",
    image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=1974&auto=format&fit=crop",
    description: "Luxurious silk blend blouse in warm stone."
  },
  {
    id: 4,
    name: "Structured Blazer",
    price: 280000,
    category: "women",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    description: "Tailored blazer with a modern cut."
  },
  {
    id: 5,
    name: "Streetwear Hoodie",
    price: 85000,
    category: "unisex",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop",
    description: "Heavyweight cotton hoodie."
  },
  {
    id: 6,
    name: "Wide Leg Denim",
    price: 110000,
    category: "women",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop",
    description: "High-waisted wide leg denim jeans."
  },
  {
    id: 7,
    name: "Utility Cargo Pants",
    price: 95000,
    category: "men",
    image: "https://images.unsplash.com/photo-1517445312882-b892306cde9b?q=80&w=1974&auto=format&fit=crop",
    description: "Functional cargo pants with multiple pockets."
  },
  {
    id: 8,
    name: "Cropped Knit Sweater",
    price: 75000,
    category: "women",
    image: "https://images.unsplash.com/photo-1624823183496-6e9e5c46b6a2?q=80&w=2070&auto=format&fit=crop",
    description: "Soft knit sweater with a cropped fit."
  },
  {
    id: 9,
    name: "Minimalist Leather Sneakers",
    price: 180000,
    category: "men",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop",
    description: "Clean white leather sneakers."
  },
  {
    id: 10,
    name: "Satin Slip Dress",
    price: 135000,
    category: "women",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop",
    description: "Elegant satin slip dress for evening wear."
  },
  {
    id: 11,
    name: "Tech Fleece Joggers",
    price: 90000,
    category: "men",
    image: "https://images.unsplash.com/photo-1552940259-7ff72a563b72?q=80&w=1887&auto=format&fit=crop",
    description: "Comfortable tech fleece joggers."
  },
  {
    id: 12,
    name: "Oversized Trench Coat",
    price: 320000,
    category: "women",
    image: "https://images.unsplash.com/photo-1616142718915-d9dfb12c8ff6?q=80&w=1887&auto=format&fit=crop",
    description: "Classic oversized trench coat."
  }
];

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('reeam_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('reeam_products_v3', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const loginAdmin = () => setIsAdmin(true);
  const logoutAdmin = () => setIsAdmin(false);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      isAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      removeFromCart,
      getCartTotal,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </ShopContext.Provider>
  );
};
