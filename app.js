const express = require('express')
const AuthRoutes = require('./routes/authRoute')
const BlogRoutes = require('./routes/blogRoute')
const {connectToMongoDB} = require('./db')

require('dotenv').config

const PORT = process.env.PORT
const app = express()

// Connection to DB
connectToMongoDB()

app.use(express.json())

// Routes definition
app.use('/auth', AuthRoutes)
app.use('/blog', BlogRoutes)

app.get('/', (req, res) =>{
    res.status(200).json({
        message: "Welcome to Blogging API"
    })
})

app.use((error, req, res, next) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error('Error: ', error)
   
    if (error.type == 'NOT_FOUND')
        res.status(500).send(error)
     else if (error.type == 'Not Found') 
        res.status(404).send(error)
    else {
        res.status(500).send(error)
    }

    next() 
})


app.get('*', (req,res) =>{
    res.status(404).json({
        message: "Route not found"
    })
})


app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
})





