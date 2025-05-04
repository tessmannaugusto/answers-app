import dotenv from 'dotenv'
import express from 'express'
import answersRoutes from './routes/answersRoute.js'
import { AppDataSource } from '../data-source.js'

dotenv.config()

AppDataSource.initialize()
  .then(() => {
    const app = express()

    app.use(express.json())

    // Routes
    app.use('/api/answers', answersRoutes)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  }).catch((error) => {
    console.error(`Error when conecting to the database: ${error}`)
  })
