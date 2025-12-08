import type { Metadata } from 'next'
import { Aclonica } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const inter = Aclonica({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AntdRegistry>
          {children}
          {modal}
        </AntdRegistry>
      </body>
    </html>
  )
}
