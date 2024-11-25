import { create } from "zustand"
import { persist } from "zustand/middleware"
import Cookies from "js-cookie"
import { clearAuthentication, setAuthentication } from "@/axios"
import {
  getUserProfile,
  login,
  updateUserProfile,
} from "@/services/loginService"
import { IUser } from "@/interfaces/IUser"
import { register } from "@/services/registerService"
import { useApplicationStore } from "./useApplicationStore"

type UserState = {
  isAuthenticated: boolean
  userId: string
  currentUser: IUser | null
}

type UserActions = {
  login: (
    username: string,
    password: string,
    remember: boolean
  ) => Promise<void>
  logout: () => void
  register: (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => void
  updateUser: (
    userId: string,
    firstName?: string,
    lastName?: string,
    bio?: string
  ) => void
}

const initialUserState: UserState = {
  isAuthenticated: false,
  userId: "",
  currentUser: null,
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialUserState,
      login: async (username: string, password: string, remember: boolean) => {
        const { setLoading } = useApplicationStore.getState()
        setLoading(true)
        try {
          const { user } = await login(username, password)
          console.log(user)
          if (remember) {
            Cookies.set("hopehub_user", user.id, { expires: 1, path: "/" })
          } else {
            sessionStorage.setItem("hopehub_user", user.id)
          }
          set({ userId: user.id, isAuthenticated: true })
          setAuthentication(user.id)
          const userData = await getUserProfile(user.id)
          console.log(userData)
          set({
            currentUser: userData,
          })
          console.log(get().currentUser)
        } catch (error) {
          throw error
        } finally {
          setLoading(false)
        }
      },
      logout: () => {
        set({
          userId: "",
          isAuthenticated: false,
          currentUser: null,
        })
        clearAuthentication()
        Cookies.remove("hopehub_user", { path: "/" })
        sessionStorage.removeItem("hopehub_user")
      },
      register: async (
        firstName: string,
        lastName: string,
        username: string,
        password: string
      ) => {
        try {
          const registerData = await register({
            firstName,
            lastName,
            username,
            password,
          })

          alert("Register Success")
          console.log(registerData)
        } catch (error) {
          alert("Register Error")
          console.error("Register error:", error)
        }
      },
      updateUser: async (
        userId: string,
        firstName?: string,
        lastName?: string,
        bio?: string
      ) => {
        try {
          await updateUserProfile({
            userId,
            firstName,
            lastName,
            bio,
          })

          console.log("update success")
        } catch {
          throw Error
        }
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        currentUser: state.currentUser,
      }),
    }
  )
)
