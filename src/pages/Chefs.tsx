import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const Chefs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-secondary py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight">
              نخبة طهاة <span className="text-primary italic">طنطا</span> في مكان واحد
            </h1>
            <p className="text-xl text-white/60 leading-relaxed font-light mb-10">
              اكتشف القصص وراء كل وجبة. طهاتنا ليسوا مجرد طباخين، بل هم فنانون يقدمون لك خلاصة خبراتهم وحبهم في كل طبق.
            </p>

            <div className="flex flex-wrap gap-8 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">١٥+</p>
                  <p className="text-xs uppercase tracking-widest text-white/40 font-bold">طاهٍ معتمد</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">٥٠٠+</p>
                  <p className="text-xs uppercase tracking-widest text-white/40 font-bold">عميل سعيد</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500">
                  <Star size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">٤.٩</p>
                  <p className="text-xs uppercase tracking-widest text-white/40 font-bold">متوسط التقييم</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Add Your Kitchen Section - Replaces Chefs Grid */}
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="bg-paper rounded-[80px] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex-1 relative z-10">
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-6 block">انضمي إلى عائلتنا</span>
              <h2 className="text-5xl md:text-7xl font-bold text-secondary font-serif mb-8 leading-tight">مطبخكِ يستحق <br/><span className="text-primary italic">أن يراه العالم</span></h2>
              <p className="text-xl text-secondary/60 leading-relaxed font-light mb-12">
                نحن في طبلية نؤمن بأن كل سيدة في طنطا تمتلك سراً خاصاً في مطبخها. انضمي إلينا اليوم وحولي شغفك بالطبخ إلى مصدر دخل مستدام. نحن نتكفل بكل شيء من التصوير والتسويق وحتى التوصيل.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { title: 'إدارة سهلة', desc: 'لوحة تحكم بسيطة لمتابعة طلباتك وأرباحك.' },
                  { title: 'دعم فني', desc: 'فريق متخصص لمساعدتك في تصوير وتنسيق وجباتك.' },
                  { title: 'توصيل آمن', desc: 'أسطول توصيل يضمن وصول وجباتك طازجة وساخنة.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Star size={16} className="fill-primary" />
                    </div>
                    <p className="text-secondary font-medium"><span className="font-bold">{item.title}:</span> {item.desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/login?type=chef" className="group inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black text-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/20">
                سجلي مطبخكِ الآن
                <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 relative z-10">
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white aspect-[4/5]"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Add Kitchen" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                {/* Floating badge */}
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 max-w-[240px]">
                  <p className="text-primary font-black text-4xl mb-2">١٠٠٪</p>
                  <p className="text-secondary/60 text-sm font-bold leading-tight">دعم كامل للأسر المنتجة في طنطا</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chefs;
