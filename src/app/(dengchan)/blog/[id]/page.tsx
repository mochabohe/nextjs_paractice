import React from 'react'
import { Card, Space } from 'antd'
import { data } from '@/data'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = data.find((post) => post.id === parseInt(params.id))
  return {
    title: post?.title,
    description: post?.body,
  }
}

export default function page({ params }: { params: { id: string } }) {
  const post = data.find((post) => post.id === parseInt(params.id))
  return (
    <Card
      title={post?.title}
      extra={<a href='#'>More</a>}
      style={{ width: 300 }}
    >
      <p>{post?.body}</p>
    </Card>
  )
}
