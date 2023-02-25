const express = require('express')
const cors = require('cors')
const app = express()



app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 4000


const router = require('./routes/userRouter.js')
app.use('/api/user', router)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})