import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { databaseService } from './services/database';
import { Product } from './types/Product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'admin'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, login, logout } = useAuth();

  // Load products from database on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await databaseService.getAllProducts();
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const newProduct = await databaseService.addProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const handleAdminLogin = (username: string, password: string) => {
    const success = login(username, password);
    if (success) {
      setCurrentView('admin');
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  const handleViewTenders = () => {
    setCurrentView('products');
  };

  // Admin Panel View
  if (currentView === 'admin' && isAuthenticated) {
    return <AdminPanel onLogout={handleLogout} onAddProduct={handleAddProduct} />;
  }

  // Admin Login View
  if (currentView === 'admin' && !isAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tenders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'home' && (
        <HomePage products={products} onViewTenders={handleViewTenders} />
      )}
      
      {currentView === 'products' && (
        <ProductsPage products={products} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;