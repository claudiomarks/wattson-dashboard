import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3 as Source_Sans_Pro, Playfair_Display } from "next/font/google"
import "./globals.css"

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans-pro",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair-display",
})

export const metadata: Metadata = {
  title: "Wattson - Battery Management Dashboard",
  description: "Modern battery management system for Ubuntu laptop servers",
  generator: "Wattson Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${sourceSansPro.style.fontFamily};
  --font-sans: ${sourceSansPro.variable};
  --font-serif: ${playfairDisplay.variable};
}
        `}</style>
      </head>
      <body className={`${sourceSansPro.variable} ${playfairDisplay.variable} antialiased`}>{children}</body>
    </html>
  )
}
