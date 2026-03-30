import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, MapPin, UtensilsCrossed, Flame } from 'lucide-react';
import { useApp } from '../context';

const Header = () => {
  const { cart, isLoggedIn, userType } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="glass-nav">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white relative overflow-hidden shadow-lg shadow-primary/20">
            <UtensilsCrossed size={20} className="relative z-10" />
            <Flame size={12} className="absolute bottom-1 right-1 text-accent animate-pulse" />
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight font-serif">طبلية</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={({ isActive }) => `font-bold text-sm transition-colors ${isActive ? 'text-primary' : 'text-secondary/80 hover:text-primary'}`}>الرئيسية</NavLink>
          <NavLink to="/meals" className={({ isActive }) => `font-bold text-sm transition-colors ${isActive ? 'text-primary' : 'text-secondary/80 hover:text-primary'}`}>الأكلات</NavLink>
          <NavLink to="/chefs" className={({ isActive }) => `font-bold text-sm transition-colors ${isActive ? 'text-primary' : 'text-secondary/80 hover:text-primary'}`}>الطهاة</NavLink>
          {isLoggedIn && userType === 'customer' && (
            <NavLink to="/track-order/TAB-10293" className={({ isActive }) => `font-bold text-sm transition-colors ${isActive ? 'text-primary' : 'text-secondary/80 hover:text-primary'}`}>طلباتي</NavLink>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-1 text-secondary/60 text-xs font-bold bg-gray-100/50 px-3 py-1.5 rounded-full border border-gray-200/50">
            <MapPin size={14} className="text-primary" />
            <span>طنطا</span>
          </div>

          <Link to="/cart" className="relative p-2 text-secondary hover:text-primary transition-colors">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <Link to={userType === 'chef' ? '/chef-dashboard' : '/profile'} className="flex items-center gap-2 bg-secondary text-white py-2 px-5 rounded-full font-bold text-sm hover:shadow-lg transition-all">
              <User size={16} />
              <span className="hidden sm:inline">حسابي</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-secondary hover:text-primary transition-colors font-bold text-sm">دخول</Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-6">
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
