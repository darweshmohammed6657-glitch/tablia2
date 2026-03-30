import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Award, ChevronRight, Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import MealCard from '../components/MealCard';
import { useApp } from '../context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Meal } from '../types';

const ChefDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { chefs } = useApp();
  const [chefMeals, setChefMeals] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  
  const chef = chefs.find(c => c.id === id);

  useEffect(() => {
    const fetchChefMeals = async () => {
      if (!id) return;
      try {
        const q = query(collection(db, 'meals'), where('chefId', '==', id));
        const querySnapshot = await getDocs(q);
        const mealsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Meal));
        setChefMeals(mealsData);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'meals');
      } finally {
        setLoadingMeals(false);
      }
    };

    fetchChefMeals();
  }, [id]);

  if (!chef) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">الطاهي غير موجود</h2>
        <Link to="/chefs" className="btn-primary">العودة للطهاة</Link>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen pb-20">
      {/* Chef Hero Section */}
      <div className="relative h-[40vh] lg:h-[50vh] w-full overflow-hidden bg-secondary">
        <img 
          src={chef.image} 
          alt={chef.name} 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center md:items-end gap-8 text-white"
            >
              <div className="relative shrink-0">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
                  <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-accent text-white p-3 rounded-2xl shadow-lg">
                  <Award size={24} />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                    {chef.specialty}
                  </span>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold">
                    <Star size={16} className="fill-accent text-accent" />
                    <span>{chef.rating} تقييم</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{chef.name}</h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-white/80 font-medium">
                  <MapPin size={18} className="text-primary" />
                  <span>طنطا، الغربية</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-xl font-bold text-secondary mb-4 font-serif">عن الطاهي</h3>
              <p className="text-secondary/70 leading-relaxed font-light mb-8">
                {chef.bio}
              </p>
              
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-secondary/60">عدد الوجبات</span>
                  <span className="font-bold text-secondary">{chefMeals.length} وجبة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary/60">وقت التحضير المعتاد</span>
                  <span className="font-bold text-secondary">٤٥-٦٠ دقيقة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chef's Meals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-secondary font-serif flex items-center gap-3">
                <Utensils className="text-primary" />
                قائمة طعام الشيف
              </h2>
            </div>
            
            {loadingMeals ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : chefMeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {chefMeals.map((meal, index) => (
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
            ) : (
              <div className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-gray-100">
                <Utensils size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-secondary mb-2">لا توجد وجبات حالياً</h3>
                <p className="text-secondary/60">هذا الطاهي لم يقم بإضافة أي وجبات بعد.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDetails;
