import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pagenum = Number(searchParams.get('pagenum')) || 1
  const pagesize = Number(searchParams.get('pagesize')) || 10
  const query = searchParams.get('query') || ''

  const data = db.data.posts

  let filteredData = data
  if (query) {
    filteredData = data.filter((item) => {
      const { id, ...rest } = item
      return Object.values(rest).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    })
  }

  const total = filteredData.length
  const startIndex = (pagenum - 1) * pagesize
  const endIndex = startIndex + pagesize
  filteredData =
    startIndex >= endIndex ? [] : filteredData.slice(startIndex, endIndex)

  return NextResponse.json({
    code: 0,
    message: '获取成功',
    data: {
      list: filteredData,
      total,
    },
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  await db.update(({ posts }) => {
    posts.unshift({
      id: Date.now(),
      ...data,
    })
  })
  return NextResponse.json({
    code: 0,
    message: '添加成功',
    data,
  })
}
