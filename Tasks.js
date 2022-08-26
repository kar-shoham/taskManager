const mongoose = require('mongoose')

let taskSchema = new mongoose.Schema({
    taskName: String,
    completed: Boolean,
    id: Number
})
taskSchema.methods.checkComplete = function() {
    return this.completed
}

module.exports = mongoose.model("tasks", taskSchema)