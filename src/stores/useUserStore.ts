import { create } from "zustand"
import Cookies from "js-cookie"
import { clearAuthentication, setAuthentication } from "@/axios"
import { getUserProfile, login } from "@/services/loginService"
import { IUser } from "@/interfaces/IUser"
import { register } from "@/services/registerService"
import { useApplicationStore } from "./useApplicationStore"

type UserState = {
  isAuthenticated: boolean
  token: string | undefined
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
}

const initialUserState: UserState = {
  isAuthenticated: false,
  token: undefined,
  currentUser: null,
}

export const useUserStore = create<UserState & UserActions>((set, get) => ({
  ...initialUserState,
  login: async (username: string, password: string, remember: boolean) => {
    const { setLoading } = useApplicationStore.getState()
    setLoading(true)
    try {
      const { accessToken } = await login(username, password)
      if (remember) {
        Cookies.set("hopehub_user", accessToken, { expires: 1, path: "/" })
      }
      sessionStorage.setItem("hopehub_user", accessToken)
      set({ token: accessToken, isAuthenticated: true })
      setAuthentication(accessToken)
      const user = await getUserProfile()
      set({
        currentUser: user,
      })
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  },
  logout: () => {
    set({ token: undefined, isAuthenticated: false, currentUser: null })
    clearAuthentication()
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
}))
