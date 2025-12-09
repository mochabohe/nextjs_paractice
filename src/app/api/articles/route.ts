import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const pagenum = Number(searchParams.get('pagenum')) || 1
    const pagesize = Number(searchParams.get('pagesize')) || 10
    const query = searchParams.get('query') || ''

    const allPosts = await getAllPosts()

    let filteredData = allPosts
    if (query) {
      filteredData = allPosts.filter((item) => {
        const { id, ...rest } = item
        return Object.values(rest).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      })
    }

    const total = filteredData.length
    const startIndex = (pagenum - 1) * pagesize
    const endIndex = startIndex + pagesize
    const paginatedData =
      startIndex >= endIndex ? [] : filteredData.slice(startIndex, endIndex)

    return NextResponse.json({
      code: 0,
      message: '获取成功',
      data: {
        list: paginatedData,
        total,
      },
    })
  } catch (error) {
    console.error('GET /api/articles error:', error)
    return NextResponse.json(
      {
        code: 1,
        message: '获取失败',
        data: { list: [], total: 0 },
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newPost = await createPost(data)

    return NextResponse.json({
      code: 0,
      message: '添加成功',
      data: newPost,
    })
  } catch (error) {
    console.error('POST /api/articles error:', error)
    return NextResponse.json(
      {
        code: 1,
        message: '添加失败',
        data: null,
      },
      { status: 500 }
    )
  }
}
