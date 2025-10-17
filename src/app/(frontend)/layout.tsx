import React from 'react'
import './styles.css'
import { Header } from '@/globals/Header/Component'
import localFont from 'next/font/local'
import { Geologica } from 'next/font/google'
import { Footer } from '@/globals/Footer/Component'

const geologica = Geologica({
  subsets: ['latin'],
  variable: '--font-geologica',
})

const openRunde = localFont({
  src: [
    {
      path: '../../fonts/OpenRunde/OpenRunde-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-open-runde',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className={`${geologica.variable} ${openRunde.variable}`}>
      <body className="text-black overscroll-none">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
