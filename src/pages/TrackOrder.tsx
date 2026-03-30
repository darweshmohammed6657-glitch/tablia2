import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  PackageCheck, 
  ChevronRight, 
  MapPin, 
  Phone, 
  MessageSquare 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../types';

const TrackOrder = () => {
  const { id } = useParams<{ id: string }>();

  // Mocking a specific order for tracking
  const mockOrder: Order = {
    id: id || 'TAB-10293',
    customerName: 'محمد علي',
    chefName: 'أم أحمد',
    items: [
      { id: '1', name: 'فرخة مشوية مع أرز بسمتي', price: 150, quantity: 1, image: '', chefId: 'c1', chefName: 'أم أحمد', rating: 4.8, category: 'مشويات', description: '' }
    ],
    total: 170,
    status: 'on_way',
    currentStep: 2,
    estimatedDelivery: '١:٣٠ م - ٢:٠٠ م',
    date: '٣٠ مارس ٢٠٢٦'
  };

  const steps = [
    { label: 'تم استلام الطلب', icon: Clock, description: 'نحن نراجع طلبك الآن' },
    { label: 'جاري التحضير', icon: PackageCheck, description: 'الطاهي يقوم بتحضير وجبتك' },
    { label: 'في الطريق', icon: Truck, description: 'المندوب استلم الوجبة وفي طريقه إليك' },
    { label: 'تم التوصيل', icon: CheckCircle2, description: 'استمتع بوجبتك الشهية!' }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-secondary/60 mb-8">
        <Link to="/" className="hover:text-primary">الرئيسية</Link>
        <ChevronRight size={16} />
        <span className="text-secondary font-medium">تتبع الطلب</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-secondary mb-2 font-serif">تتبع طلبك</h1>
          <p className="text-secondary/60 font-bold">رقم الطلب: <span className="text-primary">{mockOrder.id}</span></p>
        </div>
        <div className="bg-primary/10 text-primary px-6 py-3 rounded-2xl border border-primary/20">
          <p className="text-xs font-bold uppercase tracking-widest mb-1">موعد الوصول المتوقع</p>
          <p className="text-xl font-black">{mockOrder.estimatedDelivery}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card-premium p-8">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute right-[19px] top-4 bottom-4 w-1 bg-gray-100 rounded-full" />
              
              {/* Progress Line */}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${(mockOrder.currentStep / (steps.length - 1)) * 100}%` }}
                className="absolute right-[19px] top-4 w-1 bg-primary rounded-full z-10"
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              <div className="space-y-12 relative z-20">
                {steps.map((step, index) => {
                  const isActive = index <= mockOrder.currentStep;
                  const isCurrent = index === mockOrder.currentStep;
                  const Icon = step.icon;

                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white border-2 border-gray-100 text-gray-300'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div className={isActive ? 'opacity-100' : 'opacity-40'}>
                        <h3 className={`font-bold text-lg ${isCurrent ? 'text-primary' : 'text-secondary'}`}>
                          {step.label}
                          {isCurrent && <span className="mr-3 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full animate-pulse">مباشر</span>}
                        </h3>
                        <p className="text-sm text-secondary/60">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="card-premium p-8">
            <h3 className="font-bold text-xl mb-6 font-serif">تفاصيل التوصيل</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-secondary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest mb-1">عنوان التوصيل</p>
                  <p className="font-bold">طنطا، شارع البحر، برج الأمل، الدور الرابع</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-secondary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest mb-1">رقم التواصل</p>
                  <p className="font-bold">+20 100 123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Support */}
        <div className="space-y-8">
          <div className="card-premium p-8">
            <h3 className="font-bold text-xl mb-6 font-serif">ملخص الطلب</h3>
            <div className="space-y-4 mb-6">
              {mockOrder.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-secondary/70">{item.name} × {item.quantity}</span>
                  <span className="font-bold">{item.price * item.quantity} ج.م</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="font-bold">الإجمالي</span>
              <span className="text-xl font-black text-primary">{mockOrder.total} ج.م</span>
            </div>
          </div>

          <div className="card-premium p-8 bg-secondary text-white">
            <h3 className="font-bold text-xl mb-4 font-serif">هل تحتاج مساعدة؟</h3>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">إذا واجهت أي مشكلة في طلبك، يمكنك التواصل مع الدعم الفني أو الطاهي مباشرة.</p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all border border-white/10">
                <MessageSquare size={18} />
                تحدث مع الطاهي
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-primary py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                <Phone size={18} />
                اتصل بالدعم
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
