import { useUserStore } from "@/stores/useUserStore"
import {
  Button,
  FileInput,
  Flex,
  Image,
  Modal,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import React, { useState } from "react"

interface IEditProfile {
  opened: boolean
  close: () => void
}

interface IUpdateProfileForm {
  firstName?: string
  lastName?: string
  bio?: string
}

const EditProfile: React.FC<IEditProfile> = ({ opened, close }) => {
  const form = useForm<IUpdateProfileForm>({
    //validate: zodResolver(LoginSchemas),
    initialValues: {
      firstName: "",
      lastName: "",
      bio: "",
    },
  })

  const { updateUser, userId } = useUserStore()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (file: File | null) => {
    setFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file) // แปลงไฟล์เป็น Base64 เพื่อพรีวิว
    } else {
      setPreview(null)
    }
  }

  const handleSubmitUpdateProfile = async (value: IUpdateProfileForm) => {
    const { firstName, lastName, bio } = value

    try {
      await updateUser(userId, firstName, lastName, bio)
    } catch {
      alert("User Not Found")
      throw Error
    }
  }

  return (
    <Modal opened={opened} onClose={close} centered title='Edit Profile'>
      <Paper
        component='form'
        onSubmit={form.onSubmit(handleSubmitUpdateProfile)}
      >
        <Flex gap='md' direction='column'>
          <FileInput
            label='Upload Avatar'
            description='Only image files are allowed (e.g., .jpg, .png)'
            placeholder='Select an avatar'
            accept='image/*'
            onChange={handleFileChange}
          />
          {preview && (
            <Image
              src={preview}
              alt='Preview'
              radius='md'
              width={150}
              height={150}
            />
          )}
          {!preview && <Text size='sm'>No image selected</Text>}
          <TextInput
            label='First Name'
            placeholder='Change first name'
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label='Last Name'
            placeholder='Change last name'
            {...form.getInputProps("lastName")}
          />
          <Textarea
            label='Bio'
            placeholder='Input bio'
            {...form.getInputProps("bio")}
          />
          <Button type='submit'>Confirm</Button>
        </Flex>
      </Paper>
    </Modal>
  )
}

export default EditProfile
