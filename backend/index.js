require('dotenv').config(); 
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const port = 3000

const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todo')

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Example app listening on port ${PORT}`)
})
