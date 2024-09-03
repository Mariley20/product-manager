import DashboardCard from "@/components/DashboardCard";
import productCategoriesFB from "@/services/productCategoriesFB";
import productsFB from "@/services/productsFB";
import usersFB from "@/services/usersFB";
import { IProduct, IProductCategory } from "@/types/productTypes";
import { IUser } from "@/types/userTypes";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

function DashboardView() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [productCategories, setProductCategories] = useState<IProductCategory[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    handleGetProducts()
    handleGetProductCategories()
    handleGetUsers()
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const handleGetProducts = async () => {
    try {
      const products = await productsFB.getProducts()
      setProducts(products)
    } catch (error) {
      console.log(error)
    }
  }
  const handleGetProductCategories = async () => {
    try {
      const productCategories = await productCategoriesFB.getProductCategories()
      setProductCategories(productCategories)

    } catch (error) {
      console.log(error)
    }
  }
  const handleGetUsers = async () => {
    try {
      const users = await usersFB.getUsers()
      setUsers(users)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <DashboardCard title="Users actives" quantity={users.length}></DashboardCard>
      <DashboardCard title="Products Categories" quantity={productCategories.length}></DashboardCard>
      <DashboardCard title="Products" quantity={products.length}></DashboardCard>
    </Container>
  )
}

export default DashboardView