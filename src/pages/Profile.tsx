import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { User, Mail, Phone, MapPin, LogOut, Package, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const Profile = () => {
  const { user, userType, setIsLoggedIn, setUserType } = useApp();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUserType(null);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary font-serif mb-8">حسابي الشخصي</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar / Profile Info */}
            <div className="md:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 text-center"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={40} />
                  )}
                </div>
                <h2 className="text-xl font-bold text-secondary mb-1">{userData?.name || user?.displayName || 'مستخدم طبلية'}</h2>
                <p className="text-secondary/60 text-sm mb-6">{userType === 'chef' ? 'طاهي' : 'عميل'}</p>
                
                <div className="space-y-4 text-right">
                  <div className="flex items-center gap-3 text-secondary/70">
                    <Mail size={18} className="text-primary shrink-0" />
                    <span className="text-sm truncate">{user?.email}</span>
                  </div>
                  {userData?.phone && (
                    <div className="flex items-center gap-3 text-secondary/70">
                      <Phone size={18} className="text-primary shrink-0" />
                      <span className="text-sm" dir="ltr">{userData.phone}</span>
                    </div>
                  )}
                  {userData?.address && (
                    <div className="flex items-center gap-3 text-secondary/70">
                      <MapPin size={18} className="text-primary shrink-0" />
                      <span className="text-sm">{userData.address}</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full mt-8 flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-colors"
                >
                  <LogOut size={18} />
                  تسجيل الخروج
                </button>
              </motion.div>
            </div>

            {/* Main Content / Orders */}
            <div className="md:col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-secondary font-serif flex items-center gap-2">
                    <Package className="text-primary" />
                    طلباتي الأخيرة
                  </h3>
                </div>

                {/* Mock Orders List */}
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 text-primary font-bold">
                          #{10293 - i}
                        </div>
                        <div>
                          <p className="font-bold text-secondary mb-1">وجبة غداء عائلية</p>
                          <div className="flex items-center gap-2 text-xs text-secondary/60">
                            <Clock size={12} />
                            <span>منذ {i === 0 ? 'يومين' : 'أسبوع'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <span className="font-black text-secondary">٤٥٠ ج.م</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">مكتمل</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-4 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/5 rounded-xl transition-colors">
                  عرض كل الطلبات
                  <ChevronRight size={18} className="rotate-180" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
