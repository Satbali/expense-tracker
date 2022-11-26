// To create a server
import express from 'express'
// To connect b/t backend and frontend
import cors from 'cors'
// To connect with Mongodb
import mongoose from 'mongoose'
// To send data from req body
import bodyParser from 'body-parser'
import TransactionRoute from './routes/TransactionRoute.js'

import dotenv from 'dotenv'
dotenv.config()

// Mongodb Connection string -- a promise
await mongoose.connect(process.env.MONGO_DB_URI)
console.log('connected to mongodb') // To test the connection

const app = express()
const PORT = process.env.PORT
// Inietilise the cors -- func
app.use(cors())
// Inietilise the body-parser
app.use(bodyParser.json())
app.use(('/'), TransactionRoute)

app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(process.env.PORT, console.log(`app is listneing on http://localhost:${process.env.PORT}`))