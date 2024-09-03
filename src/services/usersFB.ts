/* eslint-disable no-useless-catch */
import { auth, db } from '@/services/firebase'
import type { IUser } from '@/types/userTypes'
import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore'

const usersFB = {
  getUsers: async (): Promise<IUser[]> => {
    try {
      const usuariosRef = collection(db, 'users')
      const q = query(usuariosRef)
      const querySnapshot = await getDocs(q)
      const users: IUser[] = []

      querySnapshot.docs.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        } as IUser)
      })

      return users
    } catch (error) {
      throw error
    }
  },
  getUserById: async (userId: string): Promise<IUser> => {
    try {
      const user = await getDoc(doc(db, 'users', userId))
      const userData = user.data()
      return {
        id: userId,
        ...userData
      } as IUser
    } catch (error) {
      throw error
    }
  },
  updateUserItem: async (data: Partial<IUser>): Promise<void> => {
    try {
      const userId = auth.currentUser?.uid || ''
      const response = await setDoc(doc(db, 'users', userId), data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default usersFB
