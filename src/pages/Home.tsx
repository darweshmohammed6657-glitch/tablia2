import React from 'react';
import Hero from '../components/Hero';
import MealCard from '../components/MealCard';
import { MOCK_MEALS } from '../types';
import { Link } from 'react-router-dom';
import { ChevronLeft, Star, ShieldCheck, Zap, Heart, Quote, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />

      {/* Quality Promise - Editorial Style */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                title: 'جودة الشيف', 
                desc: 'كل وجبة محضرة بمعايير احترافية ونظافة تامة من مطابخ معتمدة تخضع لرقابة صارمة.', 
                icon: ShieldCheck, 
                color: 'text-primary',
                tag: 'موثوقية'
              },
              { 
                title: 'توصيل سريع', 
                desc: 'وجبتك تصلك ساخنة وطازجة في أسرع وقت ممكن عبر أسطولنا المتخصص في طنطا.', 
                icon: Zap, 
                color: 'text-accent',
                tag: 'سرعة'
              },
              { 
                title: 'حب وإتقان', 
                desc: 'طعم الأكل البيتي الأصيل الذي تفتقده، محضر بكل شغف واهتمام بأدق التفاصيل.', 
                icon: Heart, 
                color: 'text-red-500',
                tag: 'أصالة'
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                className="group relative"
              >
                <div className="mb-8 relative">
                  <div className={`w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-700 ${item.color} shadow-sm`}>
                    <item.icon size={40} strokeWidth={1} />
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-gray-100">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-bold text-3xl mb-4 text-secondary font-serif">{item.title}</h3>
                <p className="text-secondary/60 leading-relaxed font-light text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Meals - Premium Gallery */}
      <section className="py-32 bg-paper">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">قائمة الطعام المختارة</span>
              <h2 className="text-5xl md:text-7xl font-bold text-secondary font-serif leading-tight">أشهر الأطباق <br/>في <span className="text-primary italic">طنطا</span></h2>
            </div>
            <Link to="/meals" className="group flex items-center gap-4 bg-white px-8 py-4 rounded-2xl font-bold text-secondary shadow-sm hover:bg-secondary hover:text-white transition-all">
              تصفح القائمة الكاملة
              <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_MEALS.slice(0, 4).map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MealCard meal={meal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Your Kitchen Section - Replaces Chef Spotlight and Featured Chefs */}
      <section className="py-32 bg-secondary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative inline-block mb-8">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">فرصة ذهبية</span>
                  <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full" />
                </div>
                
                <h2 className="text-6xl md:text-8xl font-bold mb-10 font-serif leading-[1.1]">ابدأ مشروعك <br/><span className="text-primary italic">من مطبخك</span> اليوم</h2>
                
                <p className="text-2xl text-white/70 mb-12 leading-relaxed font-light">
                  هل تمتلكين "نفس" مميز في الطبخ؟ هل يحب الجميع أكلاتك؟ طبلية تفتح لكِ أبواب الرزق لتصلي بوجباتك الشهية إلى كل بيت في طنطا. نحن نتكفل بالتسويق والتوصيل، وأنتِ تتفرغين للإبداع.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">تسجيل سريع</h4>
                      <p className="text-white/40 text-sm">خطوات بسيطة وتبدأين في استقبال الطلبات.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      <Star size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">دعم متواصل</h4>
                      <p className="text-white/40 text-sm">فريقنا معكِ خطوة بخطوة لضمان نجاحك.</p>
                    </div>
                  </div>
                </div>

                <Link to="/login?type=chef" className="group inline-flex items-center gap-4 bg-white text-secondary px-10 py-5 rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all shadow-2xl">
                  سجلي مطبخكِ الآن
                  <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
            
            <div className="flex-1 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white/5 aspect-[4/5]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Start Your Kitchen" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-center">
                  <p className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">انضمي إلينا</p>
                  <h4 className="text-3xl font-bold font-serif">كوني شيف طبلية القادمة</h4>
                </div>
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid - Modern Layout */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">استكشف النكهات</span>
            <h2 className="text-5xl md:text-7xl font-bold text-secondary font-serif">ماذا تفضل اليوم؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[700px]">
            <Link to="/meals?category=مشويات" className="md:col-span-8 relative rounded-[60px] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="مشويات" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex flex-col justify-end p-12">
                <h3 className="text-5xl font-bold text-white mb-4 font-serif">مشويات فاخرة</h3>
                <p className="text-white/70 text-xl font-light">أشهى أنواع اللحوم والدواجن المحضرة على الفحم</p>
              </div>
            </Link>
            
            <Link to="/meals?category=محاشي" className="md:col-span-4 relative rounded-[60px] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="محاشي" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white font-serif">محاشي مصرية</h3>
              </div>
            </Link>

            <Link to="/meals?category=طواجن" className="md:col-span-4 relative rounded-[60px] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="طواجن" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white font-serif">طواجن أصيلة</h3>
              </div>
            </Link>

            <Link to="/meals?category=حلويات" className="md:col-span-8 relative rounded-[60px] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1928&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="حلويات" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex flex-col justify-end p-12">
                <h3 className="text-5xl font-bold text-white mb-4 font-serif">حلويات شرقية</h3>
                <p className="text-white/70 text-xl font-light">خاتمة مثالية لكل وجبة مصرية أصيلة</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Editorial Quote Style */}
      <section className="py-32 bg-paper relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">قصص نجاح</span>
            <h2 className="text-5xl md:text-7xl font-bold text-secondary font-serif">ماذا يقولون عنا؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'محمد علي', text: 'الأكل طعمه زي أكل البيت بالظبط، ونضيف جداً. التوصيل كان سريع والوجبة وصلت سخنة.', rating: 5, role: 'عميل دائم' },
              { name: 'سارة محمود', text: 'جربت ورق العنب والملوخية، بجد تسلم إيد الشيف. أحلى بكتير من المطاعم.', rating: 5, role: 'عاشقة للأكل المصري' },
              { name: 'أحمد حسن', text: 'فكرة ممتازة لدعم الأسر المنتجة في طنطا. الأكل جودته عالية والأسعار مناسبة جداً.', rating: 4, role: 'ناقد طعام' }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white p-12 rounded-[48px] shadow-xl shadow-gray-200/50 border border-gray-100 relative"
              >
                <Quote size={48} className="text-primary/10 absolute top-10 left-10" />
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className="text-xl text-secondary/80 font-light leading-relaxed mb-10 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center font-black text-primary text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-lg">{t.name}</p>
                    <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
