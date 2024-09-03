import { IProduct, IProductCategory } from "@/types/productTypes";
import { create } from "zustand";

interface IProductsStore {
  products: IProduct[],
  productCategories: IProductCategory[],
  productsLoaded: boolean,
  setProducts: (arg: IProduct[]) => void
  setProductCategories: (arg: IProductCategory[]) => void
}
export const useProductsStore = create<IProductsStore>((set) => ({
  products: [],
  productCategories: [],
  productsLoaded: false,
  setProducts: (products) => set({ products }),
  setProductCategories: (productCategories) => set({ productCategories }),
}))