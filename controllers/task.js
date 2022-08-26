let Tasks = require('../Tasks')
let getAllTasks = async(req, res) => {
    let allTasks = await Tasks.find()
    if(allTasks.length)res.json({success: true, data: allTasks})
    else res.json({success: false, data: []})
} 
let getTask = async(req, res) => {
    let {id} = req.params
    let task = await Tasks.where('id').equals(+id).limit(1)
    if(task.length) res.json({success: true, data: task[0]})
    else res.json({success: false, data: []})
}
let createTask = async(req, res) => {
    let {tName, tNumber} = req.body
    let toAdd = {
        taskName: tName,
        id: +tNumber,
        completed: false
    }
    let task = new Tasks(toAdd)
    await task.save().then(() => {
        console.log("saved to db...")
    })
    res.json(task)
}
let updateTask = async(req, res) => {
    let {id} = req.params
    let {tName, comp} = req.body
    let task = await Tasks.where('id').equals(+id).limit(1)
    task = task[0]
    if(tName) task.taskName = tName
    if(comp !== null) task.completed = comp
    await task.save().then(() => {
        console.log("db updated...")
    })
    res.json(task)
}
let deleteTask = async(req, res) => {
    let {id} = req.params
    let toDelete = await Tasks.where('id').equals(+id).limit(1)
    if(toDelete.length === 0) res.json({success: false})
    else{
        await Tasks.deleteOne({id: +id})
        res.json({success: true, data:toDelete[0]})
    }
}

module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}