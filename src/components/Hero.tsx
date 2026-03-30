import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Play } from 'lucide-react';
import { motion } from 'motion/react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-secondary">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop" 
          alt="Arabic Food Table" 
          className="w-full h-full object-cover opacity-60 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              أفضل طهاة طنطا في مكان واحد
            </span>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 font-serif leading-[0.9] tracking-tight">
              طعم البيوت <br/> 
              <span className="text-primary italic">بلمسة شيف</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl font-light leading-relaxed">
              استمتع بتجربة طعام استثنائية من مطابخ طنطا المنزلية. وجبات طازجة، صحية، ومحضرة بكل حب وإتقان لتصلك أينما كنت.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                to="/meals" 
                className="group relative inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 overflow-hidden"
              >
                <span className="relative z-10">استكشف القائمة</span>
                <ArrowLeft size={24} className="relative z-10 group-hover:-translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <button className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                  <Play size={20} className="fill-current" />
                </div>
                <span className="font-bold text-lg">شاهد كيف نعمل</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-12 left-12 hidden xl:flex gap-12 text-white">
        <div>
          <p className="text-4xl font-bold font-serif mb-1">+٥٠</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-black">طاهي معتمد</p>
        </div>
        <div className="w-px h-12 bg-white/10" />
        <div>
          <p className="text-4xl font-bold font-serif mb-1">+١٠٠٠</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-black">عميل سعيد</p>
        </div>
        <div className="w-px h-12 bg-white/10" />
        <div>
          <p className="text-4xl font-bold font-serif mb-1">٤.٩</p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-black">متوسط التقييم</p>
        </div>
      </div>

      {/* Decorative Scroll Indicator */}
      <div className="absolute bottom-12 right-1/2 translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-black vertical-text">اسحب للأسفل</span>
      </div>
    </section>
  );
};

export default Hero;
