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

export const login = async (
  username: string,
  password: string
): Promise<ILoginResponse> => {
  const response = await AxiosPublicInstance.post<ILoginResponse>(
    "/auth/login",
    {
      username,
      password,
    }
  )
  return response.data
}

export const getUserProfile = async (): Promise<IUserResponse> => {
  const response = await AxiosPrivateInstance.get<IUserResponse>("/users/me")
  return response.data
}
