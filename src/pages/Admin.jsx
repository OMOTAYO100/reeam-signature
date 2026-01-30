import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Trash2, Plus, X, Edit2, Upload } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const Admin = () => {
  const { isAdmin, products, addProduct, updateProduct, deleteProduct } = useShop();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'men',
    image: '',
    description: ''
  });

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || ''
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', price: '', category: 'men', image: '', description: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) { // Limit to 800KB
        alert("Image is too large! Please use an image smaller than 800KB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    try {
      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }
      handleCancel();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(`Failed to save product: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-[var(--color-primary)]">Admin Dashboard</h1>
          {!showForm && (
             <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4"/> Add Product
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-12 bg-white p-4 rounded-lg shadow-sm border border-gray-100 animate-fade-in relative">
             <button 
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-medium mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] outline-none"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <label className="flex-1 cursor-pointer">
                      <div className="w-full px-4 py-2 border border-gray-300 rounded-sm flex items-center gap-2 text-gray-500 hover:bg-gray-50 transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="truncate">{formData.image ? 'Image Selected' : 'Choose Local File'}</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>
                    <span className="text-xs text-gray-400 uppercase font-bold">OR</span>
                    <input
                      type="url"
                      value={formData.image.startsWith('data:') ? '' : formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] outline-none"
                      placeholder="Paste Image URL"
                    />
                  </div>
                  {formData.image && (
                    <div className="mt-2 text-xs text-green-600 font-medium">Preview available</div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:border-[var(--color-accent)] outline-none"
                  rows="3"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : (editingId ? 'Update Product' : 'Save Product')}</Button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile View: Card Layout */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden p-4 shadow-sm">
              <div className="flex gap-4">
                <img className="h-20 w-20 rounded-lg object-cover border border-gray-100" src={product.image} alt={product.name} />
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">{product.name}</div>
                  <div className="text-xs text-gray-500 capitalize mb-1">{product.category}</div>
                  <div className="text-sm font-medium text-[var(--color-primary)]">₦{product.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-50">
                <button 
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 text-indigo-600 rounded-sm hover:bg-indigo-100 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-sm hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table Layout */}
        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;
