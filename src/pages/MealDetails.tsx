import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ChevronRight, User, Clock, ShieldCheck, Heart, Share2, Info, Utensils, Award, MapPin } from 'lucide-react';
import { useApp } from '../context';
import { motion } from 'motion/react';
import MealCard from '../components/MealCard';

const MealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, meals, chefs } = useApp();
  
  const meal = meals.find(m => m.id === id);
  const chef = chefs.find(c => c.id === meal?.chefId);
  const relatedMeals = meals.filter(m => m.category === meal?.category && m.id !== id).slice(0, 3);

  if (!meal) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">الأكلة غير موجودة</h2>
        <Link to="/meals" className="btn-primary">العودة للأكلات</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section with Image and Overlay */}
      <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <img 
          src={meal.image} 
          alt={meal.name} 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                  {meal.category}
                </span>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold">
                  <Star size={16} className="fill-accent text-accent" />
                  <span>{meal.rating} تقييم</span>
                </div>
                {meal.rating >= 4.8 && (
                  <span className="bg-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white">
                    شائع
                  </span>
                )}
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-serif leading-tight">{meal.name}</h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <span className="font-medium">٤٥-٦٠ دقيقة</span>
                </div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                <div className="flex items-center gap-2">
                  <Utensils size={20} className="text-primary" />
                  <span className="font-medium">وجبة عائلية</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Chef Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
                    <img src={`https://picsum.photos/seed/${meal.chefId}/200/200`} alt={meal.chefName} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-accent text-white p-1.5 rounded-lg shadow-md">
                    <Award size={16} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest mb-1">تم التحضير بواسطة</p>
                  <Link to={`/chef/${meal.chefId}`} className="text-2xl font-bold text-secondary hover:text-primary transition-colors">{meal.chefName}</Link>
                  <div className="flex items-center gap-2 mt-1 text-secondary/60 text-sm font-medium">
                    <MapPin size={14} className="text-primary" />
                    <span>حي الاستاد، طنطا</span>
                  </div>
                </div>
              </div>
              <Link to={`/chef/${meal.chefId}`} className="btn-secondary px-8 py-3 rounded-2xl text-sm font-bold">
                عرض ملف الطاهي
              </Link>
            </motion.div>

            {/* Description & Ingredients */}
            <div className="space-y-10">
              <section>
                <h3 className="text-2xl font-bold text-secondary mb-6 font-serif flex items-center gap-3">
                  <Info className="text-primary" />
                  عن هذه الوجبة
                </h3>
                <p className="text-xl text-secondary/70 leading-relaxed font-light">
                  {meal.description}
                  يتم تحضير هذه الوجبة باستخدام أجود المكونات الطازجة من السوق المحلي في طنطا. نضمن لك طعماً أصيلاً يذكرك بلمة العيلة ودفء البيت المصري.
                </p>
              </section>

              {meal.ingredients && (
                <section>
                  <h3 className="text-2xl font-bold text-secondary mb-6 font-serif">المكونات المختارة</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {meal.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all group">
                        <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                        <span className="font-medium text-secondary/80">{ing}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-paper rounded-3xl border border-gray-100 flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">معايير جودة طبلية</h4>
                    <p className="text-sm text-secondary/60 leading-relaxed">نطبق أعلى معايير النظافة والجودة في جميع مطابخنا المنزلية المشتركة في المنصة.</p>
                  </div>
                </div>
                <div className="p-6 bg-paper rounded-3xl border border-gray-100 flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">تحضير طازج</h4>
                    <p className="text-sm text-secondary/60 leading-relaxed">لا نقوم بتخزين الطعام؛ كل وجبة يتم تحضيرها خصيصاً لك بعد تأكيد الطلب.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Order Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-sm text-secondary/40 font-bold mb-1">السعر النهائي</p>
                    <p className="text-4xl font-black text-secondary">{meal.price} <span className="text-lg font-bold text-primary">ج.م</span></p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                     <button className="p-3 bg-gray-50 rounded-2xl text-secondary hover:text-primary transition-colors">
                        <Heart size={20} />
                     </button>
                     <button className="p-3 bg-gray-50 rounded-2xl text-secondary hover:text-primary transition-colors">
                        <Share2 size={20} />
                     </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary/60">وقت التوصيل المتوقع</span>
                    <span className="font-bold text-secondary">٤٥-٦٠ دقيقة</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary/60">رسوم التوصيل (طنطا)</span>
                    <span className="font-bold text-green-600">مجاني</span>
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(meal)}
                  className="w-full btn-primary py-5 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                  إضافة إلى السلة
                </button>
              </div>

              {/* Quick Support Card */}
              <div className="bg-secondary rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">هل لديك استفسار؟</h4>
                  <p className="text-white/60 text-sm mb-6">تحدث مباشرة مع فريق دعم طبلية في طنطا.</p>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all">
                    تواصل معنا الآن
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Meals Section */}
        {relatedMeals.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-bold text-secondary font-serif">أكلات مشابهة قد تعجبك</h3>
              <Link to="/meals" className="text-primary font-bold hover:underline flex items-center gap-2">
                عرض الكل <ChevronRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedMeals.map(m => (
                <MealCard key={m.id} meal={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
