import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Meals from './pages/Meals';
import MealDetails from './pages/MealDetails';
import Chefs from './pages/Chefs';
import ChefDetails from './pages/ChefDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ChefDashboard from './pages/ChefDashboard';
import AddMeal from './pages/AddMeal';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence, motion } from 'motion/react';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/chef/:id" element={<ChefDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
          <Route path="/add-meal" element={<AddMeal />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const MainContent = () => {
  const { loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <MainContent />
      </Router>
    </AppProvider>
  );
}
