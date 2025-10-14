import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 border-t-2 px-6 to-gray-400/10 text-black mt-10 rounded-t-md">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h1 className="font-bold text-2xl">Job Hunt</h1>
          <p className="text-sm text-black-200 mt-2">
            Find your dream job, connect with top companies, and grow your career.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-black">
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Companies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Stay Updated</h2>
          <p className="text-sm text-black mb-3">
            Subscribe to our newsletter for the latest job updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-white focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-400 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-gray-900">
        © 2025 Job Hunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
