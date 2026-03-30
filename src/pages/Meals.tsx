import React, { useState } from 'react';
import { MOCK_MEALS } from '../types';
import MealCard from '../components/MealCard';
import { Search, Filter, SlidersHorizontal, Utensils, Flame, Clock, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const Meals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'مشويات', 'محاشي', 'طواجن', 'معجنات', 'حلويات'];

  const filteredMeals = MOCK_MEALS.filter(meal => {
    const matchesSearch = meal.name.includes(searchQuery) || meal.chefName.includes(searchQuery);
    const matchesCategory = selectedCategory === 'الكل' || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-paper py-20 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-secondary mb-6 font-serif leading-tight">
                قائمة طعام <span className="text-primary italic">طبلية</span>
              </h1>
              <p className="text-xl text-secondary/60 leading-relaxed font-light mb-12 max-w-2xl">
                استكشف مئات الأطباق المنزلية المحضرة بكل حب من طهاة طنطا المبدعين. من المشويات الفاخرة إلى الحلويات الشرقية الأصيلة.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="ابحث عن أكلة، مكون، أو طاهي..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 px-14 rounded-2xl bg-white border border-gray-200 focus:border-primary focus:outline-none transition-all text-lg shadow-sm"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              </div>
              <button className="h-16 px-8 bg-secondary text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-secondary/90 transition-all w-full md:w-auto justify-center shadow-lg shadow-secondary/10">
                <SlidersHorizontal size={20} />
                تصفية متقدمة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-10">
            <div>
              <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                <Utensils size={18} className="text-primary" />
                التصنيفات
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-right px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-between group ${
                      selectedCategory === cat 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-secondary/60 hover:bg-gray-50 hover:text-secondary'
                    }`}
                  >
                    <span>{cat}</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-all ${selectedCategory === cat ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-paper rounded-3xl border border-gray-100">
              <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <Flame size={18} className="text-primary" />
                الأكثر طلباً
              </h4>
              <p className="text-xs text-secondary/50 leading-relaxed">
                يتم تحديث هذه القائمة يومياً بناءً على تقييمات وطلبات أهالي طنطا.
              </p>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Mobile Categories */}
            <div className="lg:hidden flex items-center gap-3 overflow-x-auto pb-6 mb-8 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white border border-gray-100 text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredMeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredMeals.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MealCard meal={meal} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-[48px] border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-sm">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">لم نجد أي أطباق</h3>
                <p className="text-secondary/60">حاول تغيير كلمات البحث أو اختيار تصنيف آخر.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('الكل');}}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quality Promise Section */}
      <section className="bg-secondary py-24 mt-20 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">تحضير طازج</h4>
              <p className="text-white/60 leading-relaxed">كل وجبة يتم تحضيرها عند الطلب لضمان أعلى جودة وطعم أصيل.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
                <Star size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">طهاة معتمدون</h4>
              <p className="text-white/60 leading-relaxed">نختار طهاتنا بعناية فائقة ونقوم بزيارات دورية لمطابخهم لضمان النظافة.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">توصيل آمن</h4>
              <p className="text-white/60 leading-relaxed">نستخدم أحدث وسائل التغليف الحراري للحفاظ على درجة حرارة وجودة الطعام.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </section>
    </div>
  );
};

export default Meals;
