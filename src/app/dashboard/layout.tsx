import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard with Parallel Routes',
}

export default function DashboardLayout({
  children,
  team,
  analytics,
}: Readonly<{
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}>) {
  return (
    <div style={{ padding: '20px' }}>
      <nav className='flex gap-10 justify-center'>
        <Link className='text-blue-500 mr-2' href='/dashboard'>
          Home (dengchan)
        </Link>
        <Link className='text-blue-500 mr-2' href='/dashboard/visitors'>
          visitors
        </Link>
      </nav>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ border: '2px solid blue', padding: '10px', flex: 1 }}>
          <strong>Team Slot:</strong>
          {team}
        </div>
        <div style={{ border: '2px solid green', padding: '10px', flex: 1 }}>
          <strong>Analytics Slot:</strong>
          {analytics}
        </div>
      </div>

      <div style={{ border: '2px solid red', padding: '10px' }}>
        <strong>Children Slot:</strong>
        {children}
      </div>
    </div>
  )
}
