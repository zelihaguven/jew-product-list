import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luxury Jewelry Collection",
  description: "Discover our exquisite collection of fine jewelry with real-time pricing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Avenir';
              src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
              font-weight: 300 500;
              font-display: swap;
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
