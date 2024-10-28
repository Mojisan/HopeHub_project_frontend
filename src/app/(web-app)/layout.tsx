import { Providers } from "../providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/images/favicon.ico' sizes='any' />
        <title>CMS Phase 2</title>
      </head>
      <body style={{ minHeight: "100vh" }}>
        <Providers forceColorScheme='light'>{children}</Providers>
      </body>
    </html>
  )
}
