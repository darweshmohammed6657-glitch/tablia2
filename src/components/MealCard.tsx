import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Clock, Heart, Award } from 'lucide-react';
import { Meal, MOCK_CHEFS } from '../types';
import { useApp } from '../context';
import { motion } from 'motion/react';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { addToCart } = useApp();
  const chef = MOCK_CHEFS.find(c => c.id === meal.chefId);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[40px] p-2 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 w-full rounded-[36px] overflow-hidden mb-6">
        <Link to={`/meal/${meal.id}`}>
          <img 
            src={meal.image} 
            alt={meal.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-40" />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
            <Star size={14} className="fill-accent text-accent" />
            <span className="text-xs font-black text-secondary">{meal.rating}</span>
          </div>
        </div>

        <button className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-primary rounded-2xl transition-all shadow-lg">
          <Heart size={18} />
        </button>

        {/* Category Tag */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-primary text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
            {meal.category}
          </span>
        </div>
      </div>
      
      <div className="px-6 pb-8">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/meal/${meal.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-bold text-2xl text-secondary font-serif leading-tight">{meal.name}</h3>
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-6 group/chef bg-gray-50/50 p-3 rounded-3xl border border-gray-100/50 group-hover:bg-white transition-colors">
          <div className="relative">
            <img 
              src={chef?.image} 
              alt={chef?.name} 
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover/chef:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
              <Award size={10} className="text-accent" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Link to={`/chef/${meal.chefId}`} className="block font-bold text-secondary text-sm hover:text-primary transition-colors truncate">
              {meal.chefName}
            </Link>
            <p className="text-[10px] text-secondary/40 line-clamp-1 font-medium italic">
              {chef?.bio}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1 text-[10px] font-black text-secondary bg-accent/10 px-2 py-0.5 rounded-lg">
              <Star size={10} className="fill-accent text-accent" />
              <span>{chef?.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-secondary/40 font-bold">
              <Clock size={10} className="text-primary" />
              <span>٤٥ د</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-1">السعر</p>
            <p className="text-2xl font-black text-secondary">{meal.price} <span className="text-sm font-bold text-primary">ج.م</span></p>
          </div>
          <button 
            onClick={() => addToCart(meal)}
            className="flex items-center justify-center gap-2 bg-secondary text-white p-4 rounded-2xl hover:bg-primary transition-all shadow-lg shadow-secondary/10 group/btn"
          >
            <ShoppingCart size={22} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MealCard;
