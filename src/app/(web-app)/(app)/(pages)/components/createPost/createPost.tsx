import { usePostStore } from "@/stores/usePostStore"
import { useUserStore } from "@/stores/useUserStore"
import { Button, Flex, Paper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"

interface IPostForm {
  title: string
  content: string
}

const CreatePost = () => {
  const { post } = usePostStore()
  const { userId } = useUserStore()

  const form = useForm<IPostForm>({
    // validate: zodResolver(LoginSchemas),
    initialValues: {
      title: "",
      content: "",
    },
  })

  const handleSubmitPost = async (value: IPostForm) => {
    const { title, content } = value

    try {
      await post(title, content, userId)

      console.log("post success")
    } catch {
      alert("Can't Post")
      throw Error
    }
  }

  return (
    <Paper
      shadow='sm'
      p='lg'
      radius='md'
      withBorder
      style={{
        width: "100%",
      }}
      component='form'
      onSubmit={form.onSubmit(handleSubmitPost)}
    >
      <Flex direction='column' gap='lg'>
        <TextInput
          label='Title'
          placeholder='กรอกหัวข้อเรื่อง'
          {...form.getInputProps("title")}
          required
        />
        <TextInput
          label='Content'
          placeholder='กรอกเนื้อหา'
          {...form.getInputProps("content")}
        />
        <Flex justify='end'>
          <Button type='submit'>Post</Button>
        </Flex>
      </Flex>
    </Paper>
  )
}

export default CreatePost
