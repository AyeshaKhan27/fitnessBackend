const express = require('express')
const cors = require('cors')
const app = express()



app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 4000


const userRouter = require('./routes/userRouter.js')
app.use('/api/user', userRouter)

const productRouter = require('./routes/productRouter.js')
app.use('/api/product', productRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})