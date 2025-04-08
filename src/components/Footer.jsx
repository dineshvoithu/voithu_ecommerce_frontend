// src/components/Footer.jsx

import React from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
// import visa from "/images/payments/visa.png";

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm">
        {/* ABOUT */}
        <div>
          <h3 className="text-gray-800 mb-2 font-semibold uppercase text-xs">
            About
          </h3>
          <ul className="space-y-1 text-gray-600">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Corporate Info</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="text-gray-800 mb-2 font-semibold uppercase text-xs">
            Help
          </h3>
          <ul className="space-y-1 text-gray-600">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
            <li>Report Infringement</li>
          </ul>
        </div>

        {/* CONSUMER POLICY */}
        <div>
          <h3 className="text-gray-800 mb-2 font-semibold uppercase text-xs">
            Policy
          </h3>
          <ul className="space-y-1 text-gray-600">
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-gray-800 mb-2 font-semibold uppercase text-xs">
            Social
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <Facebook size={16} /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={16} /> Twitter
            </li>
            <li className="flex items-center gap-2">
              <Youtube size={16} /> YouTube
            </li>
          </ul>
        </div>

        {/* MAIL US */}
        <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-2">
          <h3 className="text-gray-800 mb-2 font-semibold uppercase text-xs">
            Mail Us
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Voithu Electronics,
            <br />
            123 Market Road,
            <br />
            Bengaluru, Karnataka 560001,
            <br />
            India
            <br />
            Email: support@voithu.com
          </p>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Voithu Electronics. All rights
            reserved.
          </p>
          <div className="flex items-center gap-3">
            {/* <img src={visa} alt="Visa" className="h-6 object-contain" /> */}
            <img
              src={"images/payments/Mastercard.png"}
              alt="MasterCard"
              className="h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
