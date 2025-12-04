'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const linkData = [
    {
      label: 'Performance',
      href: '/performance',
    },
    {
      label: 'Reliability',
      href: '/reliability',
    },
    {
      label: 'Scale',
      href: '/scale',
    },
  ]

  // const accessLink = ['/', '/performance', '/reliability', '/scale']

  // // 只在特定路径显示 header
  // if (!accessLink.includes(pathname)) {
  //   return null
  // }

  return (
    <header className='sticky top-0 left-0 w-full z-20 bg-slate-900/90 backdrop-blur text-white'>
      <div className='flex items-center justify-between container mx-auto px-6 py-4'>
        <Link
          className={
            pathname === '/'
              ? 'text-blue-500 text-2xl font-bold'
              : 'text-white text-2xl font-bold hover:text-blue-500 transition-colors'
          }
          href='/'
        >
          Home
        </Link>
        <nav className='text-lg space-x-6'>
          {linkData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? 'text-blue-500  font-bold'
                  : 'text-white font-bold hover:text-blue-500 transition-colors'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
