import { NextResponse } from 'next/server'
import { getPostById, updatePost, deletePost } from '@/lib/posts'

interface IParams {
  params: { id: string }
}

export async function GET(request: Request, { params }: IParams) {
  try {
    const post = await getPostById(Number(params.id))
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
    const success = await deletePost(Number(params.id))

    if (!success) {
      return NextResponse.json(
        {
          code: 1,
          message: '文章不存在',
          data: null,
        },
        { status: 404 }
      )
    }

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
    const updatedPost = await updatePost(Number(params.id), data)

    if (!updatedPost) {
      return NextResponse.json(
        {
          code: 1,
          message: '文章不存在',
          data: null,
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      code: 0,
      message: '修改成功',
      data: updatedPost,
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
