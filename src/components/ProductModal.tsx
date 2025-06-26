import React from 'react';
import { X, Calendar, Clock, Building, CreditCard, Award, TrendingUp, Mail, FileText } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const detailItems = [
    { label: 'Sr No', value: product.srNo, icon: <Award className="w-5 h-5" /> },
    { label: 'Product Name', value: product.productName, icon: <Building className="w-5 h-5" /> },
    { label: 'Tender No', value: product.tenderNo, icon: <CreditCard className="w-5 h-5" /> },
    { label: 'Due Date', value: new Date(product.dueDate).toLocaleDateString(), icon: <Calendar className="w-5 h-5" /> },
    { label: 'Due Time', value: product.dueTime, icon: <Clock className="w-5 h-5" /> },
    { label: 'EMD Amount', value: product.emdAmount, icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Bank Name', value: product.bankName, icon: <Building className="w-5 h-5" /> },
    { label: 'RTGS Code', value: product.rtgsCode, icon: <CreditCard className="w-5 h-5" /> },
    { label: 'SSI/NSIC/MSME', value: product.ssiNsicMsme, icon: <Award className="w-5 h-5" /> },
    { label: 'ISO Certification', value: product.iso, icon: <Award className="w-5 h-5" /> },
    { label: 'Turnover', value: product.turnover, icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Tender Form Amount', value: product.tenderFormAmt, icon: <CreditCard className="w-5 h-5" /> }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Tender Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <img 
              src={product.imageUrl} 
              alt={product.productName}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Description Section */}
          {product.description && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-3">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-800">Description</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {detailItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="text-blue-600 mr-3">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 ml-8">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <Mail className="w-5 h-5 mr-3" />
              <span className="font-medium">Contact Information</span>
            </div>
            <p className="text-lg font-semibold">{product.contactEmail}</p>
            <p className="text-blue-100 mt-2">For any queries regarding this tender, please contact us at the above email address.</p>
          </div>
        </div>
      </div>
    </div>
  );
};