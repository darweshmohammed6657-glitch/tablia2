import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { User, ChefHat, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useApp } from '../context';
import { motion, AnimatePresence } from 'motion/react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialType = (searchParams.get('type') as 'customer' | 'chef') || 'customer';
  
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [activeType, setActiveType] = useState<'customer' | 'chef'>(initialType);
  const { setIsLoggedIn, setUserType } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUserType(activeType);
    navigate(activeType === 'chef' ? '/chef-dashboard' : '/');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left Side: Visual & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary items-center justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={activeType === 'chef' 
              ? "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop"
            }
            alt="Branding" 
            className="w-full h-full object-cover opacity-40 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="font-bold text-white/60">العودة للرئيسية</span>
            </Link>

            <h1 className="text-6xl font-bold mb-8 font-serif leading-tight">
              {activeType === 'chef' 
                ? "حول شغفك بالطبخ إلى قصة نجاح" 
                : "أشهى الأكلات المنزلية بضغطة زر"}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed font-light mb-12">
              {activeType === 'chef'
                ? "انضم إلى مجتمع طهاة طنطا المبدعين وابدأ في بناء علامتك التجارية الخاصة من مطبخك."
                : "استمتع بطعم الأكل البيتي الأصيل المحضر بكل حب وإتقان من طهاة منطقتك في طنطا."}
            </p>

            <div className="space-y-6">
              {[
                activeType === 'chef' ? 'إدارة كاملة لمنيو أكلاتك' : 'مئات الوجبات المتنوعة يومياً',
                activeType === 'chef' ? 'نظام طلبات ذكي وسهل' : 'توصيل سريع وآمن لباب بيتك',
                activeType === 'chef' ? 'دعم فني وتسويقي مستمر' : 'دعم للأسر المنتجة في طنطا'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-medium text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-paper/30 relative overflow-y-auto">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 right-8">
           <Link to="/" className="text-3xl font-bold text-primary font-serif">طبلية</Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md py-12"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-secondary mb-4 font-serif">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-secondary/60 text-lg">
              {isLogin ? 'أهلاً بك مجدداً في طبلية' : 'ابدأ رحلتك معنا اليوم واستمتع بأفضل الخدمات'}
            </p>
          </div>

          <div className="card-premium p-8 lg:p-10">
            {/* Role Toggle */}
            <div className="flex p-1.5 bg-gray-100 rounded-[20px] mb-10">
              <button 
                onClick={() => setActiveType('customer')}
                className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-[15px] font-bold transition-all ${
                  activeType === 'customer' ? 'bg-white text-primary shadow-xl shadow-gray-200/50' : 'text-secondary/40 hover:text-secondary'
                }`}
              >
                <User size={20} />
                عميل
              </button>
              <button 
                onClick={() => setActiveType('chef')}
                className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-[15px] font-bold transition-all ${
                  activeType === 'chef' ? 'bg-white text-primary shadow-xl shadow-gray-200/50' : 'text-secondary/40 hover:text-secondary'
                }`}
              >
                <ChefHat size={20} />
                طاهي
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-bold text-secondary mb-2">الاسم الكامل</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          placeholder="أدخل اسمك بالكامل"
                          className="w-full h-14 px-12 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all text-lg"
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-secondary mb-2">رقم الهاتف</label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          required
                          placeholder="01xxxxxxxxx"
                          className="w-full h-14 px-12 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all text-lg"
                        />
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    </div>
                    {activeType === 'chef' && (
                      <div>
                        <label className="block text-sm font-bold text-secondary mb-2">المنطقة في طنطا</label>
                        <div className="relative">
                          <select className="w-full h-14 px-12 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all text-lg appearance-none">
                            <option>حي الاستاد</option>
                            <option>شارع البحر</option>
                            <option>سيجر</option>
                            <option>القحافة</option>
                            <option>المحطة</option>
                          </select>
                          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-bold text-secondary mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    className="w-full h-14 px-12 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all text-lg"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-secondary">كلمة المرور</label>
                  {isLogin && <Link to="#" className="text-xs text-primary font-bold hover:underline">نسيت كلمة المرور؟</Link>}
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full h-14 px-12 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all text-lg"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <button type="submit" className="w-full btn-primary py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                <ArrowRight size={20} />
              </button>

              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <span className="relative bg-white px-4 text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em]">أو بواسطة</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-3 h-14 rounded-2xl border border-gray-200 font-bold hover:bg-gray-50 transition-all text-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  جوجل
                </button>
                <button type="button" className="flex items-center justify-center gap-3 h-14 rounded-2xl border border-gray-200 font-bold hover:bg-gray-50 transition-all text-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-black">
                    <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.55-.67-2.85-.67-1.31 0-1.89.65-2.85.65-1.12 0-2.03-.63-3.13-1.61C3.06 18.5 1.64 15.22 1.64 12.15c0-3.11 2.03-4.77 3.99-4.77 1.04 0 1.91.65 2.62.65.69 0 1.76-.74 2.96-.74 1.25 0 2.31.54 3.02 1.47-2.61 1.54-2.18 4.95.42 6.01-.63 1.58-1.45 3.15-2.6 4.51zM12.03 7.25c-.02-2.39 1.97-4.41 4.31-4.5.19 2.44-2.28 4.54-4.31 4.5z"/>
                  </svg>
                  أبل
                </button>
              </div>
            </form>

            <div className="text-center mt-10">
              <p className="text-secondary/60 font-medium">
                {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-black hover:underline ml-1"
                >
                  {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                </button>
              </p>
            </div>
          </div>

          <p className="text-center mt-12 text-xs text-secondary/40 leading-relaxed">
            باستمرارك، أنت توافق على <Link to="#" className="underline">شروط الخدمة</Link> و <Link to="#" className="underline">سياسة الخصوصية</Link> الخاصة بمنصة طبلية.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
