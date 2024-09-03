import { auth } from "@/services/firebase";
import usersFB from "@/services/usersFB";
import { useAuthStore } from "@/store/authStore"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"

function DefaultLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const setUser = useAuthStore((state) => state.setUser)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoaded(true)
        return
      }
      const userId = user.uid
      const meUser = await usersFB.getUserById(userId)
      setLoaded(true)
      setUser(meUser)
    })
    // Código de limpieza que se ejecuta cuando el componente se desmonta
    return () => {
      console.log('Component unmounted');
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  if (loaded) {
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />
  }
  return <div>Loading...</div>
}

export default DefaultLayout