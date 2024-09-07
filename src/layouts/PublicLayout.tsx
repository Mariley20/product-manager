import { useLoadUserData } from "@/customHooks/useLoadUserData";
import { useAuthStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router-dom"

function DefaultLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const isLoaded = useLoadUserData();


  if (isLoaded) {
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />
  }
  return <div>Loading...</div>
}

export default DefaultLayout