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
  userId: string
  firstName?: string
  lastName?: string
  bio?: string
  avatar?: File
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
  profile: string
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

export const getUserProfile = async (userId: string): Promise<IUserResponse> => {
  try {
    const response = await AxiosPrivateInstance.get<IUserResponse>(
      "http://localhost:5000/api/get-profile",
      {
        params: { userId }, // ส่ง userId ใน query parameters
      }
    );
    alert("success"); // แสดงข้อความเมื่อสำเร็จ
    return response.data; // ส่งข้อมูลกลับ
  } catch (error) {
    throw new Error("Failed to fetch user profile"); // โยน error สำหรับการจัดการในที่อื่น
  }
};


export const updateUserProfile = async (
  payloads: IUpdateProfileParams
): Promise<IUpdateProfileResponse> => {
  const formData = new FormData()

  // เพิ่มข้อมูลลงใน FormData
  formData.append("userId", payloads.userId)
  if (payloads.firstName) formData.append("firstName", payloads.firstName)
  if (payloads.lastName) formData.append("lastName", payloads.lastName)
  if (payloads.bio) formData.append("bio", payloads.bio)

  // เพิ่มไฟล์ avatar ถ้ามี
  if (payloads.avatar) {
    formData.append("avatar", payloads.avatar)
  }

  const response = await AxiosPrivateInstance.put<IUpdateProfileResponse>(
    "http://localhost:5000/api/update-profile",
    formData, // ส่งข้อมูลในรูปแบบ FormData
    {
      headers: {
        "Content-Type": "multipart/form-data", // กำหนด Content-Type เป็น multipart
      },
    }
  )

  alert("success")
  return response.data
}
