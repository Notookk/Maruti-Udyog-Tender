import React from 'react';
import { Building } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-xl font-bold">Maruti Udyog</span>
            </div>
            <p className="text-gray-400">
              Leading industrial tender management platform connecting businesses with opportunities.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://morning.is-a.dev" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="mudyogltd@gmail.com" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="https://morning.is-a.dev" className="hover:text-white transition-colors">Developer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <p className="text-gray-400 mb-2">Email: mudyogltd@gmail.com</p>
            <p className="text-gray-400 mb-2">Phone: +91 81001 46230</p>
            <p className="text-gray-400">Address: Industrial Area, Mumbai, India</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Maruti Udyog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};