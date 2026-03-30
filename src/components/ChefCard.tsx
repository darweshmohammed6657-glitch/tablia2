import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Award, ChevronLeft } from 'lucide-react';
import { Chef } from '../types';
import { motion } from 'motion/react';

interface ChefCardProps {
  chef: Chef;
}

const ChefCard: React.FC<ChefCardProps> = ({ chef }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[40px] p-2 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 w-full rounded-[36px] overflow-hidden mb-6">
        <img 
          src={chef.image} 
          alt={chef.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
          <Star size={14} className="fill-accent text-accent" />
          <span className="text-xs font-black text-secondary">{chef.rating}</span>
        </div>

        {/* Specialty Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
            {chef.specialty}
          </span>
        </div>
      </div>
      
      <div className="px-6 pb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Award size={18} className="text-accent" />
          <h3 className="font-bold text-2xl text-secondary font-serif">{chef.name}</h3>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 mb-4 text-secondary/40 text-xs font-bold">
          <MapPin size={12} className="text-primary" />
          <span>طنطا، مصر</span>
          <span className="mx-1">•</span>
          <span>{chef.reviewsCount} تقييم</span>
        </div>
        
        <p className="text-secondary/60 text-sm leading-relaxed line-clamp-2 mb-8 px-2 font-light">
          {chef.bio}
        </p>
        
        <Link 
          to={`/chef/${chef.id}`} 
          className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gray-50 group-hover:bg-primary group-hover:text-white rounded-2xl font-bold transition-all duration-300"
        >
          عرض الملف الشخصي
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ChefCard;
