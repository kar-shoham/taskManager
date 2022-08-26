let btn = document.querySelector(".btn");
let list = document.querySelector(".list");
let inputField = document.querySelector("input");
let deleteBtn = document.querySelector(".deleteBtn");

let getTasks = async () => {
  let response = await fetch("http://localhost:5000/api/v1/tasks/");
  let t = await response.json();
  return t;
};

getTasks().then((d) => {
  for (let ele of d.data) {
    let li = document.createElement("li");
    li.textContent = `${ele.taskName} `;

    let t = document.createElement("button");
    t.classList.add("deleteBtn");
    t.textContent = "";
    let temp = document.createElement("button");
    temp.classList.add("editBtn");
    temp.textContent = "";
    // temp.setAttribute('href', '/editTask.html')
    li.append(temp);
    li.append(t);
    li.setAttribute("data-id", `${ele.id}`);
    if(ele.completed) li.classList.add('completed')
    list.append(li);
  }
});

btn.addEventListener("click", (e) => {
  let id = Math.floor(Math.random() * 1000);
  if (inputField.value === "") {
    console.log("Empty input field");
    return;
  }
  let toSend = {
    tName: inputField.value,
    tNumber: id,
  };
  id++;
  fetch("http://localhost:5000/api/v1/tasks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toSend),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let li = document.createElement("li");
      li.textContent = `${data.taskName} `;

      let t = document.createElement("button");
      t.classList.add("deleteBtn");
      t.textContent = "";
      let temp = document.createElement("button");
      temp.classList.add("editBtn");
      temp.textContent = "";
      // temp.setAttribute('href', '/editTask.html')
      li.append(temp);
      li.append(t);
      li.setAttribute("data-id", `${data.id}`);
      list.append(li);
    });
  inputField.value = "";
});

list.addEventListener("click", (e) => {
  // console.log(e.target)
  if (e.target.classList.contains("deleteBtn")) {
    // console.log(e.target.parentElement)
    let idToDelete = e.target.parentElement.getAttribute("data-id");
    e.target.parentElement.remove();
    fetch(`http://localhost:5000/api/v1/tasks/${idToDelete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`deleted data of id:${idToDelete}`);
      })
      .catch((err) => console.log(err));
  } 
  else if (e.target.classList.contains("editBtn")) {
    // differnet file(editTask.html file) so how to work on it idk
    let idToUpdate = e.target.parentElement.getAttribute('data-id')
    let updatedValue
    if (e.target.parentElement.classList.contains("completed")) {
      e.target.parentElement.classList.remove("completed");
      updatedValue = false
    } 
    else {
      e.target.parentElement.classList.add("completed");
      updatedValue = true
    }
    console.log(updatedValue)
    fetch(`http://localhost:5000/api/v1/tasks/${idToUpdate}`, {
      method: "PATCH",
      body: JSON.stringify({
        comp: updatedValue,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json, "lol"));
  // console.log(idToUpdate)
  }
});

