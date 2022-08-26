const express = require('express')
const app = express()
const port = 5000
const task = require('./routes/task')

app.use(express.static('./public'))
app.use('/api/v1/tasks', task)

app.listen(port, () => {
    console.log(`Server started at port ${port}...`)
})
