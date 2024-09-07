import LayoutAppBar from "@/components/LayoutAppBar";
import LayoutDrawer from "@/components/LayoutDrawer";
import { useLoadUserData } from "@/customHooks/useLoadUserData";
import { useAuthStore } from "@/store/authStore"
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Navigate, Outlet } from "react-router-dom"

function DefaultLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const { isLoaded } = useLoadUserData();


  if (!isLoaded) {
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