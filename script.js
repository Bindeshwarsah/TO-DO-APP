const inputData=document.getElementById("inputText");
const addBtn=document.getElementById("addbtn");
const todoList=document.getElementById("todolist");


let editTodo = null;

function addList(){
    // trim to remove the space before and sentence
    const inputText=inputData.value.trim();
    if(inputText==""){
        alert("You must write something in your to do");
        return;
    }

    else if(addBtn.innerHTML ==="Edit"){
        editLocalTodo(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML=inputText;
        addBtn.innerHTML = "Add";
        inputData.value ="";


    }
    else
    {
        const li =document.createElement("li");
        const task=document.createElement("p");
        task.textContent=inputText;
        li.appendChild(task);
    
        // Edit button
    
        const editBtn= document.createElement("button");
        editBtn.innerText="Edit";
        editBtn.classList.add("btn","editbtn");
        li.appendChild(editBtn);
    
        //Remove button
        const deleteBtn= document.createElement("button");
        deleteBtn.innerText="Remove";
        deleteBtn.classList.add("btn","deletebtn");
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        inputData.value="";
        saveLocalTodo(inputText);
        

    }
}

const updateTodo = (e)=>{
    //function to delete
    if(e.target.innerHTML==="Remove"){
        todoList.removeChild(e.target.parentElement);
        deteLocalTodo(e.target.parentElement);
    }

    // function to edit
    if(e.target.innerHTML==="Edit"){
        inputData.value=e.target.previousElementSibling.innerHTML;
        inputData.focus();
        addBtn.innerHTML="Edit";
        editTodo=e;
    }

}


const saveLocalTodo = (todo)=>{
    let todos;
    if(localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    todos=localStorage.setItem("todos",JSON.stringify(todos));

}

const getLocalTodo=()=>{
    let todos;
    if(localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const li =document.createElement("li");
        const task=document.createElement("p");
        task.textContent=todo;
        li.appendChild(task);
    
        // Edit button
    
        const editBtn= document.createElement("button");
        editBtn.innerText="Edit";
        editBtn.classList.add("btn","editbtn");
        li.appendChild(editBtn);
    
        //Remove button
        const deleteBtn= document.createElement("button");
        deleteBtn.innerText="Remove";
        deleteBtn.classList.add("btn","deletebtn");
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        
    });
}

const deteLocalTodo = (todo)=>{
    let todos;
    if(localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    let todoText= todo.children[0].innerHTML;
    let todoIndex=todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

const editLocalTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex]=inputData.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}






document.addEventListener('DOMContentLoaded',getLocalTodo);
addBtn.addEventListener('click', addList);
todoList.addEventListener('click', updateTodo);