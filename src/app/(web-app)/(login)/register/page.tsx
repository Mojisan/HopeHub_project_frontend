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
import packageInfo from "../../../../../package.json"
import Link from "next/link"
import { PATH } from "@/path"
import { useUserStore } from "@/stores/useUserStore"
import { useForm, zodResolver } from "@mantine/form"
import { useRouter } from "next/navigation"
import { RegisterSchemas } from "./components/schema"
import { IRegisterForm } from "./components/interface"

export default function Register() {
  const { register } = useUserStore()
  const router = useRouter()

  const form = useForm<IRegisterForm>({
    validate: zodResolver(RegisterSchemas),
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  })

  return (
    <main style={{ minHeight: "100vh" }}>
      <Flex
        style={{ height: "100vh" }}
        direction='column'
        justify='center'
        align='center'
      >
        <Title>Register</Title>
        <Container>
          <Paper
            withBorder
            shadow='md'
            p={30}
            mt={30}
            radius='md'
            style={{ width: "60vh" }}
            component='form'
            onSubmit={form.onSubmit((value) => {
              const values = {
                firstName: value.firstName,
                lastName: value.lastName,
                username: value.username,
                password: value.password,
              }

              try {
                register(
                  values.firstName,
                  values.lastName,
                  values.username,
                  values.password
                )

                router.push(PATH.LOGIN)
              } catch {
                console.log("Error")
              }
            })}
          >
            <TextInput
              label='First Name'
              placeholder='กรอก first name'
              {...form.getInputProps("firstName")}
              required
              //error={Boolean(form.errors.firstName) ? form.errors?.message : ""}
            />
            <TextInput
              label='Last Name'
              placeholder='กรอก last name'
              {...form.getInputProps("lastName")}
              required
            />
            <TextInput
              label='Username'
              placeholder='กรอก username'
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
              <Checkbox label='Remember me' />
            </Group>
            <Button type='submit' color='blue' fullWidth mt='xl'>
              Sign in
            </Button>
          </Paper>
        </Container>
        <Link href={PATH.LOGIN} color='blue'>
          login
        </Link>
        <Box fz='sm'>v. {packageInfo.version}</Box>
      </Flex>
    </main>
  )
}
