"use client"

import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import { theme } from "./theme"

interface ProvidersProps {
  children: React.ReactNode
  forceColorScheme?: "light" | "dark"
  notificationPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
}

export function Providers({
  children,
  forceColorScheme = "dark",
  notificationPosition = "bottom-right",
}: ProvidersProps) {
  return (
    <MantineProvider theme={theme} forceColorScheme={forceColorScheme}>
      <Notifications position={notificationPosition} />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
