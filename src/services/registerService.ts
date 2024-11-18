import { AxiosPublicInstance } from "@/axios"

interface IRegisterPayload {
  firstName: string
  lastName: string
  username: string
  password: string
}

interface IRegisterResponse {
  accessToken: string
}

const API_PATH = ""

export const register = async (
  payload: IRegisterPayload
): Promise<IRegisterResponse> => {
  const response = await AxiosPublicInstance.post<IRegisterResponse>(
    API_PATH,
    payload
  )
  return response.data
}
