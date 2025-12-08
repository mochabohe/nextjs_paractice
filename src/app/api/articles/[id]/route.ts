import { NextResponse } from 'next/server'
import db from '@/db'

interface IParams {
  params: { id: string }
}

export async function GET(request: Request, { params }: IParams) {
  const post = db.data.posts.find((post) => post.id === +params.id)
  return NextResponse.json({
    code: 0,
    message: '查找成功',
    data: post,
  })
}

export async function DELETE(request: Request, { params }: IParams) {
  // filter 不会修改原数组，需要重新赋值
  await db.update((data) => {
    data.posts = data.posts.filter((post) => post.id !== +params.id)
  })
  return NextResponse.json({
    code: 0,
    message: '删除成功',
    id: params.id,
  })
}

// 修改
export async function PATCH(request: Request, { params }: IParams) {
  const data = await request.json()
  let idx = -1
  await db.update(({ posts }) => {
    idx = posts.findIndex((post) => post.id === +params.id)
    posts[idx] = {
      ...posts[idx],
      ...data,
    }
  })

  return NextResponse.json({
    code: 0,
    message: '修改成功',
    data: db.data.posts[idx],
  })
}
