import { Noto_Sans_Thai_Looped } from "next/font/google"
import { createTheme } from "@mantine/core"

const noto = Noto_Sans_Thai_Looped({
  adjustFontFallback: false,
  subsets: ["latin"],
  weight: ["500"],
})

export const theme = createTheme({
  colors: {
    "blue-tnr": [
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
      "#0072bc",
    ],
  },
  fontFamily: noto.style.fontFamily,
})
