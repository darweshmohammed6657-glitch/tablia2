import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Meals from './pages/Meals';
import MealDetails from './pages/MealDetails';
import Chefs from './pages/Chefs';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ChefDashboard from './pages/ChefDashboard';
import AddMeal from './pages/AddMeal';
import TrackOrder from './pages/TrackOrder';
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

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
