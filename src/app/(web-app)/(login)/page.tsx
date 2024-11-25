"use client"

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Flex,
  Box,
} from "@mantine/core"
import "@mantine/core/styles.css"
import packageInfo from "../../../../package.json"
import Link from "next/link"
import { PATH } from "@/path"
import { ILoginForm } from "./components/interface"
import { useForm, zodResolver } from "@mantine/form"
import { LoginSchemas } from "./components/schema"
import { useUserStore } from "@/stores/useUserStore"
import { useRouter } from "next/navigation"

export default function Home() {
  const { login } = useUserStore()
  const router = useRouter()

  const form = useForm<ILoginForm>({
    validate: zodResolver(LoginSchemas),
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
  })

  const handleSubmitLogin = async (value: ILoginForm) => {
    const { username, password, remember } = value

    try {
      await login(username, password, remember)

      router.push(PATH.HOME)
    } catch {
      alert("User Not Found")
      throw Error
    }
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      <Flex
        style={{ height: "100vh" }}
        direction='column'
        justify='center'
        align='center'
      >
        <Title>Login</Title>
        <Container>
          <Paper
            withBorder
            shadow='md'
            p={30}
            mt={30}
            radius='md'
            style={{ width: "60vh" }}
            component='form'
            onSubmit={form.onSubmit(handleSubmitLogin)}
          >
            <TextInput
              label='Username'
              placeholder='กรอก user ตัวเลข 8 หลัก'
              {...form.getInputProps("username")}
              required
            />
            <PasswordInput
              label='Password'
              placeholder='กรอก password ตัวเลข 8 หลัก'
              {...form.getInputProps("password")}
              required
              mt='md'
            />
            <Group justify='space-between' mt='lg'>
              <Checkbox
                label='Remember me'
                {...form.getInputProps("remember")}
              />
            </Group>
            <Button type='submit' color='blue' fullWidth mt='xl'>
              Log in
            </Button>
          </Paper>
        </Container>

        <Link href={PATH.REGISTER} color='blue'>
          register
        </Link>

        <Box fz='sm'>v. {packageInfo.version}</Box>
      </Flex>
    </main>
  )
}
