import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Meal, Chef, MOCK_MEALS, MOCK_CHEFS } from './types';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, onSnapshot, doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';

interface AppContextType {
  cart: CartItem[];
  addToCart: (meal: Meal) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  userType: 'customer' | 'chef' | null;
  setUserType: (type: 'customer' | 'chef' | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  user: FirebaseUser | null;
  meals: Meal[];
  chefs: Chef[];
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userType, setUserType] = useState<'customer' | 'chef' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserType(userDoc.data().role as 'customer' | 'chef');
          } else {
            // Default to customer if not found
            setUserType('customer');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUserType(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch Meals
    const unsubscribeMeals = onSnapshot(collection(db, 'meals'), (snapshot) => {
      const fetchedMeals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Meal));
      setMeals(fetchedMeals);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'meals');
    });

    // Fetch Chefs
    const unsubscribeChefs = onSnapshot(collection(db, 'chefs_public'), (snapshot) => {
      const fetchedChefs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chef));
      setChefs(fetchedChefs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'chefs_public');
    });

    setLoading(false);

    return () => {
      unsubscribeMeals();
      unsubscribeChefs();
    };
  }, []);

  const seedDatabase = async () => {
    try {
      const batch = writeBatch(db);
      
      // Seed Chefs
      MOCK_CHEFS.forEach(chef => {
        const chefRef = doc(db, 'chefs_public', chef.id);
        batch.set(chefRef, {
          uid: chef.id,
          name: chef.name,
          image: chef.image,
          specialty: chef.specialty,
          bio: chef.bio,
          rating: chef.rating,
          reviewsCount: chef.reviewsCount,
          createdAt: new Date()
        });
      });

      // Seed Meals
      MOCK_MEALS.forEach(meal => {
        const mealRef = doc(db, 'meals', meal.id);
        batch.set(mealRef, {
          name: meal.name,
          description: meal.description,
          price: meal.price,
          image: meal.image,
          chefId: meal.chefId,
          chefName: meal.chefName,
          rating: meal.rating,
          category: meal.category,
          ingredients: meal.ingredients || [],
          createdAt: new Date()
        });
      });

      await batch.commit();
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };

  useEffect(() => {
    if (meals.length === 0 && user?.email === 'darweshmohammed6657@gmail.com') {
      seedDatabase();
    }
  }, [meals.length, user]);

  const addToCart = (meal: Meal) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === meal.id);
      if (existing) {
        return prev.map(item => 
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setCart(prev => prev.filter(item => item.id !== mealId));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(mealId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === mealId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      userType, setUserType, isLoggedIn, setIsLoggedIn, user, meals, chefs, loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
