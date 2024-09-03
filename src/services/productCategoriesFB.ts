/* eslint-disable no-useless-catch */
import { auth, db } from '@/services/firebase'
import { IProductCategory } from '@/types/productTypes'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'

const productCategoriesFB = {
  getProductCategories: async (): Promise<IProductCategory[]> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const userProductsRef = await getDocs(collection(db, 'user_categories', userId, 'category'))
      const productCategories: IProductCategory[] = []
      userProductsRef.docs.forEach((doc) => {
        productCategories.push({
          id: doc.id,
          ...doc.data()
        } as IProductCategory)
      })

      return productCategories
    } catch (error) {
      throw error
    }
  },
  addProducCategorytItem: async (data: Partial<IProductCategory>): Promise<string> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const itemRef = doc(db, 'user_categories', userId)
      const response = await addDoc(collection(itemRef, 'category'), data)
      return response.id
    } catch (error) {
      throw error
    }
  },
  updateProducCategorytItem: async (id: string, data: Partial<IProductCategory>) => {
    try {
      const userId = auth.currentUser?.uid || ''
      const itemRef = doc(db, 'user_categories', userId, 'category', id)
      await setDoc(itemRef, data, { merge: true })
      return
    } catch (error) {
      throw error
    }
  },
  deleteProducCategorytItem: async (id: string): Promise<void> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const itemRef = doc(db, 'user_categories', userId, 'category', id)
      await deleteDoc(itemRef)
      return
    } catch (error) {
      throw error
    }
  }
}

export default productCategoriesFB
