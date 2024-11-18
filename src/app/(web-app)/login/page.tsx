"use client";

import { useState } from "react";
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
} from "@mantine/core";
import "@mantine/core/styles.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        alert("Login successful!");
        // นำทางไปที่หน้า HomePage
        router.push("/home");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <main style={{ minHeight: "100vh" }}>
      <Flex
        style={{ height: "100vh" }}
        direction="column"
        justify="center"
        align="center"
      >
        <Title>Login</Title>
        <Container>
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            style={{ width: "60vh" }}
            component="form"
            onSubmit={handleLogin}
          >
            <TextInput
              label="Username"
              placeholder="กรอก user ตัวเลข 8 หลัก"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="กรอก password ตัวเลข 8 หลัก"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mt="md"
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
            </Group>
            <Button type="submit" color="blue" fullWidth mt="xl">
              Log in
            </Button>
          </Paper>
        </Container>
      </Flex>
    </main>
  );
}
