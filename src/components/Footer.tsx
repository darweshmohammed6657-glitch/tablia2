import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <UtensilsCrossed size={24} />
              </div>
              <span className="text-3xl font-bold tracking-tight font-serif">طبلية</span>
            </Link>
            <p className="text-white/50 leading-relaxed font-light text-lg">
              منصة طبلية تربطك بأفضل الطهاة المنزليين في طنطا. استمتع بطعم الأكل البيتي الأصيل في منزلك، محضر بكل حب وإتقان.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-serif">روابط سريعة</h4>
            <ul className="space-y-4">
              {[
                { name: 'الرئيسية', path: '/' },
                { name: 'استكشف الأكلات', path: '/meals' },
                { name: 'تعرف على الطهاة', path: '/chefs' },
                { name: 'انضم كطاهي', path: '/login?type=chef' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowLeft size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-serif">الدعم والمساعدة</h4>
            <ul className="space-y-4">
              {[
                { name: 'الأسئلة الشائعة', path: '#' },
                { name: 'سياسة الخصوصية', path: '#' },
                { name: 'شروط الاستخدام', path: '#' },
                { name: 'تواصل معنا', path: '#' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.path} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowLeft size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-serif">تواصل معنا</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">الموقع</p>
                  <p className="text-white/60">طنطا، الغربية، مصر</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">الهاتف</p>
                  <p className="text-white/60" dir="ltr">01107507344</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">البريد الإلكتروني</p>
                  <p className="text-white/60">Tabliafood.com@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-white/30 text-sm font-medium">
          <p>© {new Date().getFullYear()} طبلية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">سياسة الكوكيز</a>
            <a href="#" className="hover:text-white transition-colors">خريطة الموقع</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
