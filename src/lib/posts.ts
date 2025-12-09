import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export interface Post {
  id: number
  title: string
  content: string
}

const POSTS_KEY = 'posts'

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  const posts = await redis.get<Post[]>(POSTS_KEY)
  return posts || []
}

// 获取单篇文章
export async function getPostById(id: number): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find((post) => post.id === id) || null
}

// 添加文章
export async function createPost(data: Omit<Post, 'id'>): Promise<Post> {
  const posts = await getAllPosts()
  const newPost: Post = {
    id: Date.now(),
    ...data,
  }
  posts.unshift(newPost)
  await redis.set(POSTS_KEY, posts)
  return newPost
}

// 更新文章
export async function updatePost(
  id: number,
  data: Partial<Omit<Post, 'id'>>
): Promise<Post | null> {
  const posts = await getAllPosts()
  const index = posts.findIndex((post) => post.id === id)

  if (index === -1) {
    return null
  }

  posts[index] = {
    ...posts[index],
    ...data,
  }

  await redis.set(POSTS_KEY, posts)
  return posts[index]
}

// 删除文章
export async function deletePost(id: number): Promise<boolean> {
  const posts = await getAllPosts()
  const filteredPosts = posts.filter((post) => post.id !== id)

  if (filteredPosts.length === posts.length) {
    return false // 没有找到要删除的文章
  }

  await redis.set(POSTS_KEY, filteredPosts)
  return true
}
