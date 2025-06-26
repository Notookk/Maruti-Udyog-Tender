import React, { useState } from 'react';
import { Search, Filter, Building, Calendar, Clock, IndianRupee } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Product } from '../types/Product';

interface ProductsPageProps {
  products: Product[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tenderNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'amount':
          return parseInt(a.emdAmount.replace(/[^\d]/g, '')) - parseInt(b.emdAmount.replace(/[^\d]/g, ''));
        case 'name':
          return a.productName.localeCompare(b.productName);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Current Tenders</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse through our latest tender opportunities and find the perfect match for your business expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tenders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'name')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Due Date</option>
                <option value="amount">EMD Amount</option>
                <option value="name">Product Name</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-semibold">{filteredProducts.length}</span> tenders found
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <>
                  <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600">No tenders found matching "{searchTerm}"</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search terms or browse all tenders.</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <Building className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600">No tenders available at the moment.</p>
                  <p className="text-gray-500 mt-2">Please check back later for new opportunities.</p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      {filteredProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-800">
                  {filteredProducts.filter(p => new Date(p.dueDate) > new Date()).length}
                </div>
                <div className="text-blue-600">Active Tenders</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-800">₹50L+</div>
                <div className="text-green-600">Total Value</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-800">24/7</div>
                <div className="text-purple-600">Support Available</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};