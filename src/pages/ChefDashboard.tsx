import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Utensils, 
  Plus, 
  TrendingUp, 
  Star, 
  Settings, 
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context';
import { motion } from 'motion/react';

const ChefDashboard = () => {
  const { setIsLoggedIn, setUserType } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  const stats = [
    { label: 'إجمالي الأرباح', value: '٤,٥٠٠ ج.م', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'الطلبات النشطة', value: '٥', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'تقييم الطاهي', value: '٤.٨', icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'عدد الوجبات', value: '١٢', icon: Utensils, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'أحمد محمد', items: 'فرخة مشوية (٢)', total: 300, status: 'preparing', time: 'منذ ١٠ دقائق' },
    { id: '#1235', customer: 'سارة علي', items: 'محشي ورق عنب (١)', total: 80, status: 'pending', time: 'منذ ٢٥ دقيقة' },
    { id: '#1236', customer: 'محمود حسن', items: 'مكرونة بشاميل (٣)', total: 285, status: 'delivered', time: 'منذ ساعة' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <div className="card p-6 mb-6 text-center">
            <img src="https://picsum.photos/seed/chef1/200/200" alt="Chef" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="font-bold text-lg">أم أحمد</h3>
            <p className="text-xs text-secondary/50">طاهي متميز في طنطا</p>
          </div>

          <nav className="space-y-1">
            <Link to="/chef-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-bold">
              <ShoppingBag size={20} />
              الطلبات
            </Link>
            <Link to="/chef-meals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-gray-100 font-medium transition-all">
              <Utensils size={20} />
              وجباتي
            </Link>
            <Link to="/add-meal" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-gray-100 font-medium transition-all">
              <Plus size={20} />
              إضافة وجبة
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-gray-100 font-medium transition-all">
              <Settings size={20} />
              الإعدادات
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-all"
            >
              <LogOut size={20} />
              تسجيل الخروج
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-secondary">لوحة التحكم</h1>
            <Link to="/add-meal" className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              إضافة وجبة جديدة
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="card p-6"
              >
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-secondary/50 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-xl">آخر الطلبات</h3>
              <Link to="#" className="text-primary text-sm font-bold hover:underline">عرض الكل</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-secondary/50 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">رقم الطلب</th>
                    <th className="px-6 py-4 font-medium">العميل</th>
                    <th className="px-6 py-4 font-medium">الوجبات</th>
                    <th className="px-6 py-4 font-medium">الإجمالي</th>
                    <th className="px-6 py-4 font-medium">الحالة</th>
                    <th className="px-6 py-4 font-medium">الوقت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-secondary">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-secondary/70">{order.items}</td>
                      <td className="px-6 py-4 font-bold text-primary">{order.total} ج.م</td>
                      <td className="px-6 py-4">
                        {order.status === 'preparing' && (
                          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-xs font-bold w-fit">
                            <Clock size={14} /> جاري التحضير
                          </span>
                        )}
                        {order.status === 'pending' && (
                          <span className="flex items-center gap-1 text-accent bg-accent/10 px-2 py-1 rounded-lg text-xs font-bold w-fit">
                            <AlertCircle size={14} /> قيد الانتظار
                          </span>
                        )}
                        {order.status === 'delivered' && (
                          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold w-fit">
                            <CheckCircle2 size={14} /> تم التوصيل
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-secondary/40">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChefDashboard;
