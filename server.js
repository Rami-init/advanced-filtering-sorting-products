const express = require('express')
const app = express()
const connectDB = require('./config/connectDB')
const handleError = require('./middleware/handleError')
require('dotenv').config({path: './config.env'})
connectDB()
app.use(express.json())
app.use('/api/posts', require('./routes/posts'))
app.get('/app', (req, res, next)=>{
    res.send('Raim Feedback')
})
app.use(handleError)
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`the server is running in : ${PORT}`))

