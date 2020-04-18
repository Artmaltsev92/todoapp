import './styles.css';

const form = document.getElementById('todoForm');
let counter = 0;
var todos = []

const generateRow = (todo) => {
    const todoRow = document.createElement('tr');
    todoRow.setAttribute('id', todo.id);

    todoRow.innerHTML = 
    `<td id=${'edit_' + todo.id}>
    ${
        todo.onEdit ? 
        `<input class="form-control" type="text" id=${'input_' + todo.id} value=${todo.task} >`
        :`${todo.task}`
    }</td>
    <td><input id=${'checkbox_' + todo.id} type="checkbox" ${ todo.done && 'checked'} /></td>
    <td><button class="btn btn-danger" id=${'dlt_' + todo.id}>x</button></td>`
        
    return todoRow
}

const addToDo = (e) => {
    e.preventDefault();
    
    const formInput = document.getElementById('todoNew')
    if(!formInput.value) {
        alert('Пустая строка!')
        return
    }

    counter++;
    const todoObj = {
        id: counter,
        task: formInput.value,
        done: false,
        onEdit: false
    }
    todos = [...todos, todoObj]
    render()
    formInput.value = ''
}

const render = () => {
    const tbody = document.getElementById('todoList')
    tbody.innerHTML = ''
    todos.forEach(todo => tbody.appendChild(generateRow(todo)))
    
    const total = document.getElementById('total')
    const donetotal = document.getElementById('doneTotal')
    const undonetotal = document.getElementById('undoneTotal') 
    total.innerText = 'Итого: ' + todos.length
    donetotal.innerText = 'Сделано: ' + todos.filter(t => t.done).length
    undonetotal.innerText = 'Осталось: ' + todos.filter(t => !t.done).length
}

const handleClick = (e) => {
    const id = e.target.id
    if(!id.indexOf('dlt_')) {
        const correctId = +id.replace('dlt_', '')
        todos = [...todos.filter(x => x.id !== correctId)]
        render()
    }
    else if(!id.indexOf('edit_')) {
        rollbackRows()
        const correctId = +id.replace('edit_', '')
        const todo = todos.find(x => x.id === correctId)
        todo.onEdit = true
        render()
        const input = document.getElementById('input_' + correctId)
        input.focus()
    }
    else if(!id.indexOf('checkbox_')) {
        const correctId = +id.replace('checkbox_', '')
        const todo = todos.find(x => x.id === correctId)
        todo.done = !todo.done
        render()
    }
    else if(!id.indexOf('input_')){}
    else {
        rollbackRows()
    }
}

const rollbackRows = () => {
    if(todos.length)
    {
        todos.forEach(todo => todo.onEdit = false);
        render()
    }
}

const handleKeyPress = (e) => {
    const id = e.target.id
    if(id.indexOf('input_') === 0 && e.key === 'Enter') {
        const correctId = +id.replace('input_', '')
        const todo = todos.find(x => x.id === correctId)
        todo.task = e.target.value
        todo.onEdit = false
        render()
    }
}

document.addEventListener('submit', addToDo)
document.addEventListener('click', handleClick)
document.addEventListener('keypress', handleKeyPress)
