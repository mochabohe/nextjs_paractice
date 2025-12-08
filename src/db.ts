import { JSONFilePreset } from 'lowdb/node'

const defaultData: { posts: { id: number; title: string; content: string }[] } =
  {
    posts: [],
  }

// Use /tmp directory in serverless environments (Vercel)
// Note: Data will not persist between deployments in serverless
const dbPath = process.env.VERCEL ? '/tmp/db.json' : 'db.json'

const db = await JSONFilePreset(dbPath, defaultData)

export default db
