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

export default function Register() {
  // State สำหรับข้อมูลผู้ใช้
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ฟังก์ชันสำหรับการส่งข้อมูลไปที่ backend
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        firstName,
        lastName,
        username,
        password,
      });

      // ตรวจสอบผลลัพธ์จาก backend
      if (response.status === 201) {
        alert("User registered successfully!");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error registering user");
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
        <Title>Register</Title>
        <Container>
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            style={{ width: "60vh" }}
            component="form"
            onSubmit={handleRegister}
          >
            <TextInput
              label="First Name"
              placeholder="กรอก first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              label="Last Name"
              placeholder="กรอก last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextInput
              label="Username"
              placeholder="กรอก username"
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
              Sign in
            </Button>
          </Paper>
        </Container>
      </Flex>
    </main>
  );
}
