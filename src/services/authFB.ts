/* eslint-disable no-useless-catch */
import { auth } from '@/services/firebase'
import { IUser, IUserLogin } from '@/types/userTypes'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import usersFB from './usersFB'

const authFB = {
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw error
    }
  },
  getAuthUser: async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  },
  registerAccount: async (data: IUserLogin, userData: Partial<IUser>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)

      if (!auth.currentUser) return userCredential

      await sendEmailVerification(auth.currentUser)
      await usersFB.updateUserItem(userData)

      return userCredential.user
    } catch (error) {
      throw error
    }
  },
  logout: async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw error
    }
  },
}

export default authFB
