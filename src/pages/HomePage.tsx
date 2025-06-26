import React from 'react';
import { ArrowRight, Award, Users, TrendingUp, CheckCircle, Building2, Globe, Shield } from 'lucide-react';
import { Product } from '../types/Product';

interface HomePageProps {
  products: Product[];
  onViewTenders: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, onViewTenders }) => {
  const stats = [
    { label: 'Active Tenders', value: products.length, icon: <Building2 className="w-8 h-8" /> },
    { label: 'Total Value', value: '₹50L+', icon: <TrendingUp className="w-8 h-8" /> },
    { label: 'Registered Vendors', value: '500+', icon: <Users className="w-8 h-8" /> },
    { label: 'Success Rate', value: '95%', icon: <Award className="w-8 h-8" /> }
  ];

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Secure Platform',
      description: 'End-to-end encryption and secure payment processing for all tender transactions.'
    },
    {
      icon: <Globe className="w-12 h-12 text-green-600" />,
      title: 'Global Reach',
      description: 'Connect with vendors and contractors from across India and international markets.'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-purple-600" />,
      title: 'Quality Assurance',
      description: 'Rigorous verification process ensures only qualified vendors participate in tenders.'
    }
  ];

  const recentTenders = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-200">Maruti Udyog</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your trusted partner for industrial tenders and procurement solutions. 
              Discover opportunities, submit bids, and grow your business with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={onViewTenders}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                View All Tenders
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={onViewTenders}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6">
                  <div className="text-blue-200 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Maruti Udyog?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive platform that streamlines the entire tender process from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tenders Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Tenders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out some of our latest tender opportunities available for bidding.
            </p>
          </div>

          {recentTenders.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {recentTenders.map((tender) => (
                <div key={tender.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={tender.imageUrl} 
                    alt={tender.productName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tender.productName}</h3>
                    <p className="text-gray-600 mb-4">Tender No: {tender.tenderNo}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Due: {new Date(tender.dueDate).toLocaleDateString()}</span>
                      <span className="text-lg font-semibold text-blue-600">{tender.emdAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">No tenders available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later for new opportunities.</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={onViewTenders}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center mx-auto"
            >
              View All Tenders
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of businesses who trust Maruti Udyog for their tender management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onViewTenders}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Tenders
            </button>
            <button
              onClick={() => window.location.href = 'mailto:mudyogltd@gmail.com'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};