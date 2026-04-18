import express from 'express'
import { generateRSS } from './src/utils/rss.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 5178

// 静态文件服务
app.use(express.static('.'))

// RSS 路由
app.get('/rss.xml', async (req, res) => {
  try {
    const rss = await generateRSS()
    res.set('Content-Type', 'application/xml')
    res.send(rss)
  } catch (error) {
    console.error('Failed to generate RSS:', error)
    res.status(500).send('Failed to generate RSS feed')
  }
})

// 启动服务器
app.listen(port, () => {
  console.log(`RSS server running at http://localhost:${port}`)
})