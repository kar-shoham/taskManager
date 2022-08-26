let btn = document.querySelector('.btn')
let list = document.querySelector('.list')
let inputField = document.querySelector('input')
let deleteBtn = document.querySelector('.deleteBtn')

let getTasks = async() => {
    let response = await fetch('http://localhost:5000/api/v1/tasks/')
    let t = await response.json()
    return t
}
let id = 0
getTasks()
.then(d =>{
    id = d.data.length+1
})


getTasks()
.then(d => {
    for(let ele of d.data){
        let li = document.createElement('li')
        li.textContent = `${ele.taskName} `

        let t = document.createElement('button')
        t.classList.add('deleteBtn')
        t.textContent = 'D'
        let temp = document.createElement('button')
        temp.classList.add('editBtn')
        temp.textContent = 'E'
        li.append(temp)
        li.append(t)
        li.setAttribute('data-id', `${ele.id}`)
        list.append(li)
    }
})


btn.addEventListener('click', (e) => {
    if(inputField.value === ""){
        console.log("Empty input field")
        return
    }
    let toSend = {
        tName: inputField.value,
        tNumber: id
    }
    id++
    fetch('http://localhost:5000/api/v1/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSend),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let li = document.createElement('li')
        li.textContent = `${data.taskName} `

        let t = document.createElement('button')
        t.classList.add('deleteBtn')
        t.textContent = 'D'
        let temp = document.createElement('button')
        temp.classList.add('editBtn')
        temp.textContent = 'E'
        li.append(temp)
        li.append(t)
        li.setAttribute('data-id', `${data.id}`)
        list.append(li)
    })
    inputField.value  = ""
})

list.addEventListener('click', (e) => {
    // console.log(e.target)
    if(e.target.classList.contains('deleteBtn')){
        // console.log(e.target.parentElement)
        let idToDelete = e.target.parentElement.getAttribute('data-id')
        e.target.parentElement.remove()
        fetch(`http://localhost:5000/api/v1/tasks/${idToDelete}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(`deleted data of id:${idToDelete}`)
        })
        .catch(err => console.log(err))
    }
})

