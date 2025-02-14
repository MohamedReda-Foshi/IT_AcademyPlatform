import React from 'react'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin ,Github  } from 'lucide-react';

function Footer() {
  return (
<footer className="bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-600">EduTech Pro</h3>
            <p className="text-gray-300">
              Empowering futures through innovative IT education and professional development.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-300 hover:text-red-600 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-red-600 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-300 hover:text-red-600 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-300 hover:text-red-600 cursor-pointer" />
              <Github className="w-5 h-5 text-gray-300 hover:text-red-600 cursor-pointer" /> 
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-red-600" />
                <span className="text-gray-300">info@edutechpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="text-gray-300">123 Tech Street, IT City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 EduTech Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer