/* eslint-disable no-useless-catch */
import { auth, db } from '@/services/firebase'
import { IProduct } from '@/types/productTypes'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'

const productsFB = {
  getProducts: async (): Promise<IProduct[]> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const userProductsRef = await getDocs(collection(db, 'user_products', userId, 'product'))

      const products: IProduct[] = []

      userProductsRef.docs.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        } as IProduct)
      })

      return products
    } catch (error) {
      throw error
    }
  },
  addProductItem: async (data: Partial<IProduct>): Promise<string> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const itemRef = doc(db, 'user_products', userId)
      const response = await addDoc(collection(itemRef, 'product'), data)
      return response.id
    } catch (error) {
      throw error
    }
  },
  updateProductItem: async (id: string, data: Partial<IProduct>) => {
    try {
      const userId = auth.currentUser?.uid || ''
      const itemRef = doc(db, 'user_products', userId, 'product', id)
      await setDoc(itemRef, data, { merge: true })
      return
    } catch (error) {
      throw error
    }
  },
  deleteProductItem: async (id: string): Promise<void> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const itemRef = doc(db, 'user_products', userId, 'product', id)
      await deleteDoc(itemRef)
      return
    } catch (error) {
      throw error
    }
  }
}

export default productsFB
