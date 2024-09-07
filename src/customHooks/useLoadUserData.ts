import { auth } from '@/services/firebase';
import usersFB from '@/services/usersFB';
import { useAuthStore } from '@/store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useLoadUserData = () => {
  const [loaded, setLoaded] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoaded(true);
        return;
      }
      try {
        const userId = user.uid;
        const meUser = await usersFB.getUserById(userId);
        setUser(meUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoaded(true);
      }
    });

    return () => {
      unsubscribe(); // Limpia el listener de Firebase auth
    };
  }, []);

  return {
    isLoaded: loaded
  };
};
