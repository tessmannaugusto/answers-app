import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import adminAnswerRoute from './routes/adminAnswer.route.js'
import mockAnswerRoute from './routes/mockAnswer.route.js'
import { AppDataSource } from '../data-source.js'

dotenv.config()

AppDataSource.initialize()
  .then(() => {
    const app = express()

    app.use(cors())
    app.use(express.json())

    // Routes
    app.use('/admin/answers', adminAnswerRoute)
    app.use('/mock/answers', mockAnswerRoute)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  }).catch((error) => {
    console.error(`Error when conecting to the database: ${error}`)
  })
