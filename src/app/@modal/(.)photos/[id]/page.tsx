'use client'
import React from 'react'
import { products } from '@/app/data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id))
  const router = useRouter()

  if (!product) return <div>Product not found</div>

  return (
    <div
      className='flex justify-center items-center fixed inset-0 bg-gray-500/[.8]'
      onClick={() => {
        router.back()
      }}
    >
      <Image
        src={product.imageSrc}
        alt={product.imageAlt}
        width={500}
        height={500}
        className='rounded-lg'
      />
    </div>
  )
}
