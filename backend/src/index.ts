import dotenv from 'dotenv'
import express from 'express'
import answersRoutes from './routes/answers.js'

dotenv.config()

const app = express()

app.use(express.json())

// Routes
app.use('/api/answers', answersRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})