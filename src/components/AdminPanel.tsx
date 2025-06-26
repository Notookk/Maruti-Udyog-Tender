import React, { useState } from 'react';
import { LogOut, Upload, X, Plus, Save } from 'lucide-react';
import { Product } from '../types/Product';

interface AdminPanelProps {
  onLogout: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onAddProduct }) => {
  const [formData, setFormData] = useState({
    srNo: '',
    productName: '',
    description: '',
    tenderNo: '',
    dueDate: '',
    dueTime: '',
    emdAmount: '',
    bankName: '',
    rtgsCode: '',
    ssiNsicMsme: '',
    iso: '',
    turnover: '',
    tenderFormAmt: '',
    contactEmail: 'mudyogltd@gmail.com',
    imageUrl: ''
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      // In a real app, you would upload to a server
      // For demo, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onAddProduct({
        ...formData,
        srNo: parseInt(formData.srNo)
      });

      // Reset form
      setFormData({
        srNo: '',
        productName: '',
        description: '',
        tenderNo: '',
        dueDate: '',
        dueTime: '',
        emdAmount: '',
        bankName: '',
        rtgsCode: '',
        ssiNsicMsme: '',
        iso: '',
        turnover: '',
        tenderFormAmt: '',
        contactEmail: 'mudyogltd@gmail.com',
        imageUrl: ''
      });

      alert('Tender added successfully!');
    } catch (error) {
      alert('Error adding tender. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: 'srNo', label: 'Serial Number', type: 'number', required: true },
    { name: 'productName', label: 'Product Name', type: 'text', required: true },
    { name: 'tenderNo', label: 'Tender Number', type: 'text', required: true },
    { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
    { name: 'dueTime', label: 'Due Time', type: 'time', required: true },
    { name: 'emdAmount', label: 'EMD Amount', type: 'text', required: true },
    { name: 'bankName', label: 'Bank Name', type: 'text', required: true },
    { name: 'rtgsCode', label: 'RTGS Code', type: 'text', required: true },
    { name: 'ssiNsicMsme', label: 'SSI/NSIC/MSME', type: 'text', required: true },
    { name: 'iso', label: 'ISO Certification', type: 'text', required: true },
    { name: 'turnover', label: 'Turnover', type: 'text', required: true },
    { name: 'tenderFormAmt', label: 'Tender Form Amount', type: 'text', required: true },
    { name: 'contactEmail', label: 'Contact Email', type: 'email', required: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <Plus className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Add New Tender</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {formData.imageUrl ? (
                  <div className="relative">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag and drop an image here, or{' '}
                      <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileInput}
                        />
                      </label>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                placeholder="Enter detailed description of the tender..."
              />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required={field.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Adding Tender...' : 'Add Tender'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};