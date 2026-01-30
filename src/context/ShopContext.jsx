import { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '../firebase';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Real-time sync with Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const addProduct = async (productData) => {
    try {
      let imageUrl = productData.image;
      
      // Upload image if a file is provided
      if (productData.imageFile) {
        imageUrl = await uploadImage(productData.imageFile);
      }

      // Remove the file object before saving to DB
      const { imageFile, ...dataToSave } = productData;
      
      await addDoc(collection(db, 'products'), {
        ...dataToSave,
        image: imageUrl,
        createdAt: Date.now()
      });
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      let imageUrl = productData.image;

      if (productData.imageFile) {
        imageUrl = await uploadImage(productData.imageFile);
      }

      const { imageFile, ...dataToSave } = productData;

      await updateDoc(doc(db, 'products', id), {
        ...dataToSave,
        image: imageUrl
      });
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
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
      loading,
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
