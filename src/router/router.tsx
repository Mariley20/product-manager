import { createBrowserRouter } from "react-router-dom";
import ProductsView from "@/views/ProductsView";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import DashboardView from "@/views/DashboardView";
import DefaultLayout from "@/layouts/DefaultLayout";
import PublicLayout from "@/layouts/PublicLayout";
import UsersView from "@/views/UsersView";
import ProfileView from "@/views/ProfileView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <DashboardView /> }
    ]
  },
  {
    path: "/login",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LoginView /> }
    ]
  },
  {
    path: "/register",
    element: <PublicLayout />,
    children: [
      { index: true, element: <RegisterView /> }
    ]
  },
  {
    path: "/products",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <ProductsView /> }
    ]
  },
  {
    path: "/users",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <UsersView /> }
    ]
  },
  {
    path: "/profile",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <ProfileView /> }
    ]
  }
]);
export default router