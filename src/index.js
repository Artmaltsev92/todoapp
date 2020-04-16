import './styles.css';
import { create, check } from './helper';

const form = document.getElementById('todoForm');
let counter = 0;

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

const addNewToDo = (todo) => {
    const todoTableBody = document.getElementById('todoList');

    const todoRow = create('tr', todo.id);

    const btn = create('button', 'deleteBtn_' + todo.id, 'btn btn-danger', 'x');
    btn.addEventListener('click', deleteToDo);

    const tdWithBtn = create('td');
    tdWithBtn.appendChild(btn)

    const tdWithTask = create('td', 'taskTd_' + todo.id, null, todo.task)
    tdWithTask.addEventListener('click', onEditToDo)

    const tdWithCheckbox = create('td')
    const checkbox = create('input', 'check_' + todo.id, 'checkbox')
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => recalculate())
    tdWithCheckbox.appendChild(checkbox)   //innerHTML = `<input type="checkbox" ${ todo.done && 'checked'} />`;

    todoRow.appendChild(tdWithTask)
    todoRow.appendChild(tdWithCheckbox)
    todoRow.appendChild(tdWithBtn)  
    todoTableBody.appendChild(todoRow)
}

const deleteToDo = (e) =>{
    const todoTableBody = document.getElementById('todoList');
    const tr = document.getElementById(e.target.id.replace('deleteBtn_', ''));
    todoTableBody.removeChild(tr)
    recalculate()
}

const onEditToDo = (e) => {
    const input = create('input', 'editInput_' + e.target.id.replace('taskTd_', ''), 'form-control')
    input.type = 'text'
    input.value = e.target.innerText
    input.addEventListener('keypress', keyEnter)
    e.target.innerText = ''
    e.target.appendChild(input)
}

const keyEnter = (e) => {
    if (e.key === "Enter") {
        const tr = document.getElementById(e.target.id.replace('editInput_', 'taskTd_'));
        tr.removeChild(e.target)
        tr.innerText = e.target.value
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