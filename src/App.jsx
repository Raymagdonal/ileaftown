import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LanguageProvider } from './contexts/LanguageContext';
import { CMSProvider } from './contexts/CMSContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import MortgageCalculator from './components/MortgageCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import PropertyModal from './components/PropertyModal';
import AdminDashboard from './components/AdminDashboard';

const Home = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: '',
    maxPrice: '',
    bedrooms: '',
    amphoe: '',
    tambon: '',
  });

  const openModal = (property) => {
    setSelectedProperty(property);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProperty(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero filters={filters} setFilters={setFilters} />
        <Showcase filters={filters} onOpenModal={openModal} setFilters={setFilters} />
        <MortgageCalculator />
        <WhyChooseUs />
      </main>
      <Footer />
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={closeModal} />
      )}
    </>
  );
};



function App() {
  return (
    <CMSProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#82A8D9] via-[#4373B0] to-[#1D4375] text-gray-800 relative">

          <div className="relative z-10 flex flex-col min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </div>
      </LanguageProvider>
    </CMSProvider>
  );
}

export default App;
