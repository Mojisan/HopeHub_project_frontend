import { Suspense } from "react"

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense></Suspense>
      {children}
    </>
  )
}
