import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950  text-white py-10">
      <div className="container mx-auto  px-20">
        <div className="grid grid-cols-4  gap-1o items-center justify-center">
          {/* Useful Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Lead</li>
              <li>Value</li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-2 mt-9">
              <li>Privacy</li>
              <li>Terms</li>
              <li>FAQs</li>
              <li>Security</li>
              <li>Mobile</li>
              <li>Contact</li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-white font-bold text-xl mb-3 flex items-center">
              Categories <span className="text-green-600 ml-2 text-sm">see all</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>Vegetables & Fruits</li>
              <li>Cold Drinks & Juices</li>
              <li>Bakery & Biscuits</li>
              <li>Dry Fruits, Masala & Oil</li>
              <li>Paan Corner</li>
              <li>Pharma & Wellness</li>
              <li>Ice Creams & Frozen Desserts</li>
              <li>Beauty & Cosmetics</li>
              <li>Stationery Needs</li>
              <li>Print Store</li>
              <li>Dairy & Breakfast</li>
              <li>Instant & Frozen Food</li>
              <li>Sweet Tooth</li>
              <li>Tea, Coffee & Health Drinks</li>
              <li>Pet Care</li>
              
            </ul>
          </div>
        </div>

   
        <div className="mt-10 border-t pt-5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© QuickCartify   Private Limited, 2016-2025</p>

          <div className="flex space-x-3 my-3 md:my-0">
            <button className="bg-black text-white px-4 py-2 text-sm rounded">Download App</button>
            <button className="bg-black text-white px-4 py-2 text-sm rounded">Get it on Play Store</button>
          </div>

          <div className="flex space-x-4">
            <FaFacebook className="text-2xl" />
            <FaTwitter className="text-2xl" />
            <FaInstagram className="text-2xl" />
            <FaLinkedin className="text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
