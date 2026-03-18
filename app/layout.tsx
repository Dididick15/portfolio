import type { Metadata } from "next"
import { Outfit, Syne, Space_Mono } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Davide Dickmann",
  description: "Davide Dickmann — Portfolio",
  icons: {
    icon: "/images/logo-didi-vett.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${outfit.variable} ${syne.variable} ${spaceMono.variable} font-(family-name:--font-outfit) antialiased`}>
        {children}
      </body>
    </html>
  )
}
