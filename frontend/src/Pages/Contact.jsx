// src/pages/Contact.jsx

import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook } from 'react-icons/fa';
import MapComponent from '../Component/MapComponent';

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-8 mb-20 justify-between items-center lg:items-start p-8">
      <div className="lg:w-1/2 w-full">
        <h1 className="text-3xl font-bold mb-2 text-center lg:text-left">Contact Us</h1>
        <p className="mb-8 text-center lg:text-left">Feel free to contact us for any inquiries or information.</p>
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
            <FaMapMarkerAlt className="text-3xl" style={{ color: '#347576' }} />
            <div className="text-center lg:text-left">
              <p className="font-bold">ADDRESS</p>
              <p>Jeeppark, Baglung</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
            <FaPhoneAlt className="text-3xl" style={{ color: '#347576' }} />
            <div className="text-center lg:text-left">
              <p className="font-bold">PHONE</p>
              <p>068-521***</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
            <FaEnvelope className="text-3xl" style={{ color: '#347576' }} />
            <div className="text-center lg:text-left">
              <p className="font-bold">EMAIL</p>
              <p>aaa@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
            <FaFacebook className="text-3xl" style={{ color: '#347576' }} />
            <div className="text-center lg:text-left">
              <p className="font-bold">FACEBOOK</p>
              <a href="https://www.facebook.com/Mandakinipustaksadan" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Aaaaaaaaa Pustak Pasal
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
        <MapComponent />
      </div>
    </div>
  );
};

export default Contact;
