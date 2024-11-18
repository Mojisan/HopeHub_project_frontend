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

export default function Home() {
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
          >
            <TextInput
              label='Username'
              placeholder='กรอก user ตัวเลข 8 หลัก'
              required
            />
            <PasswordInput
              label='Password'
              placeholder='กรอก password ตัวเลข 8 หลัก'
              required
              mt='md'
            />
            <Group justify='space-between' mt='lg'>
              <Checkbox label='Remember me' />
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
