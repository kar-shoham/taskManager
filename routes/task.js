const express = require('express')

let router = express.Router()
let {getAllTasks, getTask, createTask, updateTask, deleteTask} = require('../controllers/task')

let dbConnectionUrl = 'mongodb+srv://mongo:Ha1j0PQcBSClqlw3@cluster0.84uktze.mongodb.net/?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.connect(dbConnectionUrl, () => {
    console.log('connected to database...')
})

router.use(express.json())

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router