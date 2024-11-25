"use client"

import "@mantine/core/styles.css"
import { AppShell } from "@mantine/core"
import React, { useEffect } from "react"
import Cookies from "js-cookie"
import HeaderMain from "./components/HeaderMain"
import Sidebar from "./components/Sidebar"
import { useRouter } from "next/navigation"

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  useEffect(() => {
    const userCookie = Cookies.get("hopehub_user")
    const userSession = sessionStorage.getItem("hopehub_user")

    if (!userCookie && !userSession) {
      router.push("/")
    } else {
      console.log("User authenticated:", userCookie || userSession)
    }
  }, [router])

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding={0}
    >
      <AppShell.Header bg='#ffc300'>
        <HeaderMain />
      </AppShell.Header>

      <AppShell.Navbar p='md'>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
