import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'

import postsRoutes from './routes/posts.js'

// APP INITIALIZATION
const app = express()

app.use('/posts', postsRoutes)


app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors)

// MONGODB CONFIGURATION
// TODO: make env 
// here goes CONNECTION URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((err) => console.log(err.message))
