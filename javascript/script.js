let form = document.getElementById("form");
let title = document.getElementById("title");
let description = document.getElementById("description");
let table = document.querySelector("#table tbody");
let priority = document.querySelectorAll("input[name='radioDefault']");
let btn = document.getElementById("update")
let data = JSON.parse(localStorage.getItem("data"))|| [];
let editIdx = -1;
title.focus();

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let prior = "";

    if(priority[0].checked){
        prior = priority[0].value;
        priority[0].checked = false;
    }
    else if(priority[1].checked){
        prior = priority[1].value;
        priority[1].checked = false;
    }
    else{
        prior = priority[2].value;
        priority[2].checked = false;
    }
    

    let obj = {
        title : title.value,
        discription : description.value,
        date : date.value,
        priority : prior
    }

    if(editIdx == -1){
        data.push(obj);
    }
    else{
        data[editIdx] = obj;
        editIdx = -1;
        btn.innerHTML = "Add Task";
        btn.classList.add("btn-success")
        btn.classList.remove("btn-primary")
    }
    localStorage.setItem("data",JSON.stringify(data));
    title.value = "";
    description.value = "";
    displayTask()
    title.focus();
})

const displayTask = ()=>{
    table.innerHTML = "";
    data.map((ele,idx)=>{
        let row = document.createElement("tr");
        row.innerHTML = 
        `
            <td>${idx + 1}</td>
            <td>${ele.title}</td>
            <td>${ele.discription}</td>
            <td>${ele.date}</td>
            <td>${ele.priority}</td>
            <td>
                <button class="btn btn-warning px-3 me-2"  onclick="editTask(${idx})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTask(${idx})">Delete</button>
            </td>
            
        `
        table.append(row)
    })
}   
displayTask();
const deleteTask = (idx)=>{
    data.splice(idx,1);
    localStorage.setItem("data",JSON.stringify(data));
    displayTask();
}

const editTask = (idx)=>{
    title.focus();
    let newTask = data.filter((_,index)=> idx == index )[0];
    title.value = newTask.title;
    description.value = newTask.discription;
    date.value = newTask.date;
    priority.value = newTask.priority
    editIdx = idx;
    btn.innerHTML = "Update";
    btn.classList.remove("btn-success")
    btn.classList.add("btn-primary")

}

