import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <div className='absolute inset-0 pt-20'>
      <Image src='/next.svg' width={200} height={200} alt='Logo' />
      <div className='text-3xl text-center'>chengluoning程落柠的首页</div>
    </div>
  )
}

export default page
