import React from 'react'
import { products } from '@/app/data'
import Image from 'next/image'

export default function page({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id))

  if (!product) return <div>Product not found</div>

  return (
    <>
      <Image
        src={product.imageSrc}
        alt={product.imageAlt}
        width={500}
        height={500}
        className='rounded-lg block mx-auto'
      />

      <div className='container mx-auto pt-8 border-2 border-dashed'>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>{product.imageAlt}</p>
      </div>
    </>
  )
}
