"use client"

import "@mantine/core/styles.css"
import { AppShell } from "@mantine/core"
import React from "react"
import HeaderMain from "./components/HeaderMain"
import Sidebar from "./components/Sidebar"

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      /* aside={{
        width: 600,
        breakpoint: "sm",
      }} */
      padding='md'
    >
      <AppShell.Header bg='#ffc300'>
        <HeaderMain />
      </AppShell.Header>

      <AppShell.Navbar p='md'>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      {/* <AppShell.Aside display={{ base: "none", md: "block" }}>
        Aside
      </AppShell.Aside> */}
    </AppShell>
  )
}
