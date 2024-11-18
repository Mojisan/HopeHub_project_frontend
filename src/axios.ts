import axios from 'axios'
import Cookies from 'js-cookie'

export const AxiosPublicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const AxiosPrivateInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const clearAuthentication = () => {
  delete AxiosPrivateInstance.defaults.headers.common.Authorization
  Cookies.set('hopehub_member', '', { expires: 0 })
  sessionStorage.removeItem('hopehub_member')
}

export const setAuthentication = (token: string) => {
  if (token) {
    AxiosPrivateInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    clearAuthentication()
  }
}
