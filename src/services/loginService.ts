import { AxiosPrivateInstance, AxiosPublicInstance } from "@/axios"
import { UserRole } from "@/interfaces/IUser"

interface ILoginResponse {
  accessToken: string
}

interface IUserResponse {
  id: number
  username: string
  role: UserRole
  name: string
}

const API_PATH = "http://localhost:5000/api/login"

export const login = async (
  username: string,
  password: string
): Promise<ILoginResponse> => {
  try {
    const response = await AxiosPublicInstance.post<ILoginResponse>(API_PATH, {
      username,
      password,
    })
    return response.data
  } catch {
    throw Error
  }
}

export const getUserProfile = async (): Promise<IUserResponse> => {
  const response = await AxiosPrivateInstance.get<IUserResponse>("/home")
  alert("success")
  return response.data
}
