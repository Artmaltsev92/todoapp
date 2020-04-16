import './styles.css';
import { create, check } from './helper';

const form = document.getElementById('todoForm');
let counter = 0;
let onEditingState = {
    onEditing: false,
    id: 0,
    previous: ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    counter++;
    const inputValue = document.getElementById('todoNew')
    if(check(inputValue.value)) {
        const todoObj = {
            id: counter,
            task: inputValue.value,
            done: false
        }
        addNewToDo(todoObj)
    }
    recalculate()
    inputValue.value = ''
})

document.addEventListener('click', (e) => handleClick(e))


const handleClick = (e) => {
    if(onEditingState.onEditing) {
        const tdWithTask = document.getElementById('taskTd_' + onEditingState.id)
        tdWithTask.innerHTML = ''
        tdWithTask.innerText = onEditingState.previous
        onEditingState.onEditing = false
    }

    if(e.target.id.indexOf('taskTd_') === 0) {
        onEditToDo(e)
    }
}

const addNewToDo = (todo) => {
    const todoTableBody = document.getElementById('todoList');

    const todoRow = create('tr', todo.id);
    const btn = create('button', 'deleteBtn_' + todo.id, 'btn btn-danger', 'x');
    const tdWithBtn = create('td');
    const tdWithTask = create('td', 'taskTd_' + todo.id, null, todo.task)
    const tdWithCheckbox = create('td')
    const checkbox = create('input', 'check_' + todo.id, 'checkbox')

    btn.addEventListener('click', deleteToDo);
    tdWithBtn.appendChild(btn)
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => recalculate())
    tdWithCheckbox.appendChild(checkbox) 

    todoRow.appendChild(tdWithTask)
    todoRow.appendChild(tdWithCheckbox)
    todoRow.appendChild(tdWithBtn)  
    todoTableBody.appendChild(todoRow)
}

const deleteToDo = (e) =>{
    if(onEditingState.onEditing) {
        handleClick(e)
    }

    const todoTableBody = document.getElementById('todoList');
    const tr = document.getElementById(e.target.id.replace('deleteBtn_', ''));
    todoTableBody.removeChild(tr)
    recalculate()
}

const onEditToDo = (e) => { 
    const id = e.target.id.replace('taskTd_', '');
    onEditingState = {
        onEditing: true,
        previous: e.target.innerText,
        id: id
    }

    const input = create('input', 'editInput_' + id, 'form-control')
    input.type = 'text'
    input.value = e.target.innerText
    input.addEventListener('keypress', keyEnter)
    e.target.innerText = ''
    e.target.appendChild(input)
    input.focus()
}

const keyEnter = (e) => {
    if (e.key === "Enter") {
        const tr = document.getElementById(e.target.id.replace('editInput_', 'taskTd_'));
        tr.removeChild(e.target)
        tr.innerText = e.target.value
        onEditingState.onEditing = false
    }
}

const recalculate = () => {
    let elements = document.getElementsByClassName('checkbox')
    let count = 0;
    for(let el of elements) {
        if(el.checked) {
            count++
        }
    }

    const total = document.getElementById('total')
    const doneTotal = document.getElementById('doneTotal')
    const undoneTotal = document.getElementById('undoneTotal')

    const undone = elements.length - count;
    total.innerText = 'Итого: ' + elements.length
    doneTotal.innerText = 'Сделано: ' + count
    undoneTotal.innerText = 'Осталось: ' + undone
} 