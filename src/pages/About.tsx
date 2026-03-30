import React from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Heart, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-secondary py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 border border-primary/30">
              قصتنا
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight">
              من نحن في <span className="text-primary italic">طبلية</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed font-light mb-10">
              طبلية ليست مجرد منصة لطلب الطعام، بل هي جسر يربط بين شغف الطهاة المنزليين في طنطا وحنينك للطعم البيتي الأصيل.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-secondary font-serif mb-6">رؤيتنا</h2>
              <p className="text-lg text-secondary/70 leading-relaxed mb-6">
                نسعى في طبلية إلى تمكين الأسر المنتجة والطهاة الموهوبين في طنطا من تحويل شغفهم بالطبخ إلى مصدر دخل مستدام، مع توفير تجربة طعام صحية ولذيذة وموثوقة لعملائنا.
              </p>
              <p className="text-lg text-secondary/70 leading-relaxed">
                نؤمن بأن أفضل وجبة هي تلك التي تُحضر بحب وعناية في مطبخ المنزل، ولهذا بنينا منصة تسهل وصول هذه الوجبات إليك بأعلى معايير الجودة والنظافة.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                alt="Cooking with love" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Values */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary font-serif mb-4">قيمنا</h2>
            <p className="text-secondary/60 text-lg max-w-2xl mx-auto">المبادئ التي نلتزم بها لتقديم أفضل تجربة لك ولطُهاتنا.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Heart, title: 'شغف الطبخ', desc: 'كل وجبة تُقدم عبر طبلية مصنوعة بحب واهتمام بالتفاصيل، تماماً كما تُحضر لأفراد العائلة.' },
              { icon: ShieldCheck, title: 'الجودة والنظافة', desc: 'نلتزم بأعلى معايير الجودة والنظافة في اختيار الطهاة ومتابعة تحضير الوجبات.' },
              { icon: Users, title: 'دعم المجتمع', desc: 'نهدف إلى دعم الأسر المنتجة في طنطا وتوفير فرص عمل حقيقية من داخل منازلهم.' },
              { icon: UtensilsCrossed, title: 'الطعم الأصيل', desc: 'نحافظ على وصفات الأكل البيتي الأصيلة التي تذكرنا بطبخ الأمهات والجدات.' }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-paper p-8 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
                <p className="text-secondary/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
