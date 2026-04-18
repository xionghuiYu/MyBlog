import { generateRSS } from './src/utils/rss.js'
import { writeFile } from 'fs/promises'
import { join } from 'path'

const generateRSSFeed = async () => {
  try {
    const rss = await generateRSS()
    const outputPath = join('public', 'rss.xml')
    await writeFile(outputPath, rss)
    console.log('RSS feed generated successfully at:', outputPath)
  } catch (error) {
    console.error('Failed to generate RSS feed:', error)
    process.exit(1)
  }
}

generateRSSFeed()