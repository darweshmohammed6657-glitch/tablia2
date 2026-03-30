import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context';
import { motion } from 'motion/react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, isLoggedIn } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Simulate order placement
    clearCart();
    navigate('/track-order/TAB-10293');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-secondary mb-4">سلة التسوق فارغة</h2>
        <p className="text-secondary/60 mb-8">يبدو أنك لم تضف أي وجبات لذيذة بعد.</p>
        <Link to="/meals" className="btn-primary px-10 py-3">تصفح الأكلات الآن</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-secondary mb-10">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id} 
              className="card p-4 flex items-center gap-4 md:gap-6"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 md:w-28 md:h-28 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg md:text-xl">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <p className="text-secondary/50 text-sm mb-4">بواسطة {item.chefName}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-primary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-primary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="font-bold text-lg text-primary">{item.price * item.quantity} ج.م</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-8 sticky top-24">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-secondary/70">
                <span>المجموع الفرعي</span>
                <span>{subtotal} ج.م</span>
              </div>
              <div className="flex justify-between text-secondary/70">
                <span>رسوم التوصيل (طنطا)</span>
                <span>{deliveryFee} ج.م</span>
              </div>
              <div className="h-[1px] bg-gray-100 my-2" />
              <div className="flex justify-between text-xl font-bold text-secondary">
                <span>الإجمالي</span>
                <span className="text-primary">{total} ج.م</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              إتمام الطلب
              <ArrowRight size={20} />
            </button>
            
            <p className="text-center text-xs text-secondary/40 mt-4">
              بالضغط على إتمام الطلب، أنت توافق على شروط الخدمة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
