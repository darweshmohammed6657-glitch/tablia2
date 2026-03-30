import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Utensils, DollarSign, FileText, Tag } from 'lucide-react';
import { motion } from 'motion/react';

const AddMeal = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the meal here
    alert('تم نشر الأكلة بنجاح!');
    navigate('/chef-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary mb-8">إضافة وجبة جديدة</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="card p-8 text-center">
            <label className="block text-sm font-bold text-secondary mb-4">صورة الوجبة</label>
            {image ? (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden group">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-secondary font-bold">اضغط لرفع صورة</p>
                  <p className="text-xs text-secondary/50">PNG, JPG or JPEG (Max. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* Meal Details */}
          <div className="card p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">اسم الأكلة</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="مثلاً: محشي ورق عنب"
                    className="w-full h-12 px-12 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                  <Utensils className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-secondary mb-2">السعر (ج.م)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    required
                    placeholder="0.00"
                    className="w-full h-12 px-12 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all"
                  />
                  <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-secondary mb-2">التصنيف</label>
              <div className="relative">
                <select className="w-full h-12 px-12 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all appearance-none">
                  <option>مشويات</option>
                  <option>محاشي</option>
                  <option>طواجن</option>
                  <option>معجنات</option>
                  <option>حلويات</option>
                </select>
                <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-secondary mb-2">وصف الأكلة</label>
              <div className="relative">
                <textarea 
                  required
                  rows={4}
                  placeholder="اكتب وصفاً شهياً للأكلة ومكوناتها..."
                  className="w-full p-4 pr-12 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-all"
                ></textarea>
                <FileText className="absolute right-4 top-4 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 btn-primary py-4 text-lg shadow-lg shadow-primary/20">
              نشر الأكلة
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/chef-dashboard')}
              className="flex-1 bg-white border border-gray-200 py-4 rounded-full font-bold hover:bg-gray-50 transition-all"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
