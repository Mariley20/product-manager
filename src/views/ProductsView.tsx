/* eslint-disable react-hooks/exhaustive-deps */
import ProductCreateModal from "@/components/ProductCreateModal";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import '@/styles/product-view.scss'
import { useProductsStore } from "@/store/productsStore";
import { IProduct, IProductCategory } from "@/types/productTypes";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import productsFB from "@/services/productsFB";

interface IProductHeader {
  id: string,
  label: string, minWidth: number,
  align: "center" | "left" | "right" | "inherit" | "justify" | undefined
}

const productsHeaders: IProductHeader[] = [
  { id: 'code', label: 'Code', minWidth: 170, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
  { id: 'category_id', label: 'Category', minWidth: 170, align: 'center' },
  { id: 'price', label: 'Price', minWidth: 170, align: 'center' },
]

function ProductsView() {
  const [page,] = useState(0);
  const [rowsPerPage,] = useState(10);
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const setProductCategories = useProductsStore((state) => state.setProductCategories);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser?.uid || ''
    onSnapshot(collection(db, 'user_categories', userId, 'category'), (querySnapshot) => {
      const productCategories = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as IProductCategory
      })
      setProductCategories(productCategories)
    })

    onSnapshot(collection(db, 'user_products', userId, 'product'), (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        } as IProduct
      })
      setProducts(products)
    })
    return () => {
      console.log('Component unmounted');
    };
  }, []);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteProduct = async (productId: string) => {
    try {
      await productsFB.deleteProductItem(productId)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="products-view">
      <div className="products-view__header">
        <Button
          variant="contained"
          onClick={handleOpen}>Create Product</Button>
      </div>

      <Card sx={{ marginTop: 4 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {productsHeaders.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {productsHeaders.map((column) => {
                      if (column.id === 'category_id') {
                        return (
                          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                            {row.category?.name || ''}
                          </TableCell>
                        );
                      }
                      const value = row[column.id as keyof IProduct];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                          {value || ''}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton color="error" aria-label="Delete product"
                        onClick={() => deleteProduct(row.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

      </Card >
      <ProductCreateModal
        showModal={open}
        handleClose={handleClose}
      />
    </div>
  )
}

export default ProductsView