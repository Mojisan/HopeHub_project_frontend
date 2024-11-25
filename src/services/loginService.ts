import { AxiosPrivateInstance, AxiosPublicInstance } from "@/axios"

interface ILoginResponse {
  message: string
  user: {
    id: string
    username: string
    firstName: string
    lastName: string
  }
}

interface IUpdateProfileParams {
  userId?: string
  firstName?: string
  lastName?: string
  bio?: string
}

interface IUpdateProfileResponse {
  message: string
}

interface IUserResponse {
  userId: string
  firstName: string
  lastName: string
  username: string
  bio: string
  avatar: string
  follower: number
  following: number
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

export const getUserProfile = async (
  userId: string
): Promise<IUserResponse> => {
  const response = await AxiosPrivateInstance.get<IUserResponse>(
    "http://localhost:5000/api/get-profile",
    {
      params: { userId },
    }
  )
  alert("success")
  return response.data
}

export const updateUserProfile = async (
  params: IUpdateProfileParams
): Promise<IUpdateProfileResponse> => {
  const response = await AxiosPrivateInstance.put<IUpdateProfileResponse>(
    "http://localhost:5000/api/update-profile",
    {
      params,
    }
  )
  alert("success")
  return response.data
}
