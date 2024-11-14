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

export default function Register() {
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
          >
            <TextInput
              label='First Name'
              placeholder='กรอก first name'
              required
            />
            <TextInput
              label='Last Name'
              placeholder='กรอก last name'
              required
            />
            <TextInput label='Username' placeholder='กรอก username' required />
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
              Sign in
            </Button>
          </Paper>
        </Container>
        <Box fz='sm'>v. {packageInfo.version}</Box>
      </Flex>
    </main>
  )
}
