import LayoutAppBar from "@/components/LayoutAppBar";
import LayoutDrawer from "@/components/LayoutDrawer";
import { auth } from "@/services/firebase";
import usersFB from "@/services/usersFB";
import { useAuthStore } from "@/store/authStore"
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"

function DefaultLayout() {
  const [loaded, setLoaded] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const setUser = useAuthStore((state) => state.setUser)

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
    return () => {
      console.log('Component unmounted');
    };
  }, []);
  if (!loaded) {
    return <div>Loading...</div>
  }
  if (isAuthenticated) {
    return <>
      <Box sx={{ display: 'flex' }}>
        <LayoutAppBar></LayoutAppBar>
        <LayoutDrawer></LayoutDrawer>
        <Box component="main" sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          p: 2
        }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  }
  return <Navigate to="/login" />
}

export default DefaultLayout