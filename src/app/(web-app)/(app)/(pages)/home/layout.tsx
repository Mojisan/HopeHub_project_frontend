"use client"

import "@mantine/core/styles.css"
import { AppShell } from "@mantine/core"
import React from "react"

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppShell
      aside={{
        width: 500,
        breakpoint: "sm",
      }}
      padding={0}
    >
      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Aside display={{ base: "none", md: "block" }}>
        Aside
      </AppShell.Aside>
    </AppShell>
  )
}
