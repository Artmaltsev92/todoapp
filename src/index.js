import './styles.css';

const form = document.getElementById('todoForm');
let counter = 0;
let todos = []


const addNewToDo = (todo) => {
    const todoRow = document.createElement('tr');
    todoRow.setAttribute('id', todo.id);

    todoRow.innerHTML = 
    `<td id=${'edit_' + todo.id}>${todo.task}</td>
    <td><input type="checkbox" ${ todo.done && 'checked'} /></td>
    <td><button class="btn btn-danger" id=${'dlt_' + todo.id}>x</button></td>`
        
    return todoRow
}


const render = () => {
    const todoTableBody = document.getElementById('todoList');
    todoTableBody.innerHTML = ''
    for(let todo of todos) {
        todoTableBody.appendChild(addNewToDo(todo))
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    counter++;
    const todoObj = {
        id: counter,
        task: document.getElementById('todoNew').value,
        done: false
    }

    todos = [...todos, todoObj]
    render()
})

document.addEventListener('click', clickHandler)

const clickHandler = (e) => {

}


const deleteToDo = (e) =>{
    const id = e.target.id
    const todoTableBody = document.getElementById('todoList');

    for(let child of todoTableBody.children)
    {       
        if(child.id === id)
        {
            todoTableBody.removeChild(child)
            break
        }
    }
}



const editToDo = (id, value) => {

}
