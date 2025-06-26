import React from 'react';
import { Building, Shield, Home, Package } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'products' | 'admin';
  onViewChange: (view: 'home' | 'products' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center cursor-pointer" onClick={() => onViewChange('home')}>
                <Building className="h-10 w-10 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Maruti Udyog</h1>
                  <p className="text-sm text-gray-600">Tender Management</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'home' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </button>
            <button
              onClick={() => onViewChange('products')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'products' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Package className="w-5 h-5 mr-2" />
              Tenders
            </button>
            <button
              onClick={() => onViewChange('admin')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'admin' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Shield className="w-5 h-5 mr-2" />
              Admin
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};