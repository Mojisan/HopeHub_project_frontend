import {
  Button,
  FileInput,
  Flex,
  Image,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import React, { useState } from "react"

interface IEditProfile {
  userId: string
  opened: boolean
  close: () => void
}

const EditProfile: React.FC<IEditProfile> = ({ opened, close, userId }) => {
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

  return (
    <Modal opened={opened} onClose={close} centered title='Edit Profile'>
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
        <TextInput label='First Name' placeholder='Change first name' />
        <TextInput label='Last Name' placeholder='Change last name' />
        <Textarea label='Bio' placeholder='Input bio' />
        <Button type='submit'>Confirm</Button>
      </Flex>
    </Modal>
  )
}

export default EditProfile
