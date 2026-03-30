import { ShoppingCart, User, MapPin, Search, Star, Plus, Trash2, ChevronRight, UtensilsCrossed, Flame } from 'lucide-react';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  chefId: string;
  chefName: string;
  rating: number;
  category: string;
  ingredients?: string[];
}

export interface Chef {
  id: string;
  name: string;
  image: string;
  rating: number;
  specialty: string;
  bio: string;
  reviewsCount: number;
}

export interface CartItem extends Meal {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'on_way' | 'delivered';
  currentStep: number; // 0: Pending, 1: Preparing, 2: On Way, 3: Delivered
  estimatedDelivery: string;
  date: string;
  chefName: string;
}

export const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'فرخة مشوية مع أرز بسمتي',
    description: 'دجاج متبل بخلطة طبلية السرية ومشوي على الفحم، يقدم مع أرز بسمتي مبهر وسلطات.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop',
    chefId: 'c1',
    chefName: 'مطبخ البركة',
    rating: 4.8,
    category: 'مشويات',
    ingredients: ['دجاج', 'أرز بسمتي', 'بهارات عربية', 'زعفران']
  },
  {
    id: '2',
    name: 'محشي ورق عنب بيتي',
    description: 'ورق عنب طازج محشو بخلطة الأرز والأعشاب المصرية الأصيلة، مطهو ببطء مع مرق الدجاج.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1633433662859-a22756c97175?q=80&w=2070&auto=format&fit=crop',
    chefId: 'c2',
    chefName: 'الشيف فاطمة',
    rating: 4.9,
    category: 'محاشي',
    ingredients: ['ورق عنب', 'أرز', 'شبت', 'بقدونس', 'طماطم']
  },
  {
    id: '3',
    name: 'طاجن ملوخية بالفراخ',
    description: 'ملوخية خضراء طازجة مع "التقلية" الثوم والكزبرة، تقدم مع قطع دجاج محمرة وأرز بالشعيرية.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop',
    chefId: 'c1',
    chefName: 'مطبخ البركة',
    rating: 4.7,
    category: 'طواجن',
    ingredients: ['ملوخية', 'ثوم', 'كزبرة ناشفة', 'دجاج']
  },
  {
    id: '4',
    name: 'صينية مكرونة بالبشاميل',
    description: 'مكرونة فرن غنية بطبقات اللحم المفروم المتبل وصلصة البشاميل الكريمية والجبن.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2080&auto=format&fit=crop',
    chefId: 'c3',
    chefName: 'مطبخ هناء',
    rating: 4.6,
    category: 'معجنات',
    ingredients: ['مكرونة', 'لحم مفروم', 'حليب', 'دقيق', 'جبن']
  },
  {
    id: '5',
    name: 'كشري مصري أصلي',
    description: 'طبق الكشري الشهير بخلطة الصلصة الحارة والدقة والتقلية المقرمشة.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop',
    chefId: 'c2',
    chefName: 'الشيف فاطمة',
    rating: 4.9,
    category: 'شعبي',
    ingredients: ['أرز', 'عدس', 'مكرونة', 'حمص', 'بصل مقلي']
  },
  {
    id: '6',
    name: 'طاجن بامية باللحمة الضاني',
    description: 'بامية صغيرة مطهوة في الفرن مع قطع لحم ضاني طرية وصلصة طماطم مسبكة.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop',
    chefId: 'c1',
    chefName: 'مطبخ البركة',
    rating: 4.8,
    category: 'طواجن',
    ingredients: ['بامية', 'لحم ضاني', 'طماطم', 'ثوم']
  },
  {
    id: '7',
    name: 'صينية بسبوسة بالسمن البلدي',
    description: 'بسبوسة مرملة ومسقية بالشربات الخفيف، محضرة بالسمن البلدي الصافي ومزينة بالمكسرات.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1514516348920-f319999a5e5f?q=80&w=2070&auto=format&fit=crop',
    chefId: 'c2',
    chefName: 'الشيف فاطمة',
    rating: 5.0,
    category: 'حلويات',
    ingredients: ['سميد', 'سمن بلدي', 'سكر', 'مكسرات']
  },
  {
    id: '8',
    name: 'كفتة مشوية بيتي',
    description: 'كفتة لحم بقري متبلة ومشوية على السيخ، تقدم مع سلطة طحينة وعيش بلدي طازج.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9481bfa?q=80&w=2070&auto=format&fit=crop',
    chefId: 'c3',
    chefName: 'مطبخ هناء',
    rating: 4.5,
    category: 'مشويات',
    ingredients: ['لحم بقري', 'بصل', 'بقدونس', 'بهارات كفتة']
  }
];

export const MOCK_CHEFS: Chef[] = [
  {
    id: 'c1',
    name: 'مطبخ البركة',
    image: 'https://picsum.photos/seed/chef1/200/200',
    rating: 4.8,
    specialty: 'المشويات والطواجن',
    bio: 'خبرة ٢٠ عاماً في المطبخ المصري الأصيل. أهتم بجودة المكونات والنظافة.',
    reviewsCount: 124
  },
  {
    id: 'c2',
    name: 'الشيف فاطمة',
    image: 'https://picsum.photos/seed/chef2/200/200',
    rating: 4.9,
    specialty: 'المحاشي والحلويات',
    bio: 'أقدم لكم أكل بيتي بنفس طعم زمان. تخصصي المحاشي بأنواعها.',
    reviewsCount: 89
  },
  {
    id: 'c3',
    name: 'مطبخ هناء',
    image: 'https://picsum.photos/seed/chef3/200/200',
    rating: 4.6,
    specialty: 'المعجنات والأطباق العصرية',
    bio: 'أحب التجديد في الأطباق التقليدية مع الحفاظ على النكهة الأصلية.',
    reviewsCount: 56
  }
];
