import { NextResponse } from 'next/server'
import db from '@/db'

interface IParams {
  params: { id: string }
}

export async function GET(request: Request, { params }: IParams) {
  try {
    const post = db.data.posts.find((post) => post.id === +params.id)
    return NextResponse.json({
      code: 0,
      message: '查找成功',
      data: post,
    })
  } catch (error) {
    console.error('GET /api/articles/[id] error:', error)
    return NextResponse.json(
      {
        code: 1,
        message: '查找失败',
        data: null,
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: IParams) {
  try {
    // filter 不会修改原数组，需要重新赋值
    await db.update((data) => {
      data.posts = data.posts.filter((post) => post.id !== +params.id)
    })
    return NextResponse.json({
      code: 0,
      message: '删除成功',
      id: params.id,
    })
  } catch (error) {
    console.error('DELETE /api/articles/[id] error:', error)
    return NextResponse.json(
      {
        code: 1,
        message: '删除失败',
        data: null,
      },
      { status: 500 }
    )
  }
}

// 修改
export async function PATCH(request: Request, { params }: IParams) {
  try {
    const data = await request.json()
    let idx = -1

    await db.update(({ posts }) => {
      idx = posts.findIndex((post) => post.id === +params.id)

      // Check if post exists
      if (idx === -1) {
        throw new Error('Post not found')
      }

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
  } catch (error) {
    console.error('PATCH /api/articles/[id] error:', error)
    return NextResponse.json(
      {
        code: 1,
        message: error instanceof Error ? error.message : '修改失败',
        data: null,
      },
      { status: 500 }
    )
  }
}
