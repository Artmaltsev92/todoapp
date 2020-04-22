import './styles.css';
import { create, check } from './helper';

const form = document.getElementById('todoForm');
let counter = 0;

// cостояние приложения 
// onEditing - открыта ли форма на редактирование
// id - идентификатор таска, который открыт
// previous - значение таска во время открытия
let onEditingState = {
    onEditing: false,
    id: 0,
    previous: ''
}

// событие сабмита формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    counter++;
    const inputValue = document.getElementById('todoNew')

    // чекаем, что введена не пустая строка
    // и значение не является дубликатом
    // сheck -> helper.js
    if(check(inputValue.value)) {
        const todoObj = {
            id: counter,
            task: inputValue.value,
            done: false
        }
        addNewToDo(todoObj)
    }
    // перерасчёт футера таблицы
    recalculate()
    // обнуление значения в инпуте
    inputValue.value = ''
})

// прослушиваем событие сlick во всём приложение
document.addEventListener('click', (e) => handleClick(e))

// хэндлер
const handleClick = (e) => {
    // если открыта хоть одна форма на редактирование
    if(onEditingState.onEditing) {
        // получаем открытый таск по id из состояния
        const tdWithTask = document.getElementById('taskTd_' + onEditingState.id)
        // обнуляем внутренние значения тэга
        tdWithTask.innerHTML = ''
        // заносим исходное состояние из состояния
        tdWithTask.innerText = onEditingState.previous
        // отменяет открытие формы на редактирование
        onEditingState.onEditing = false
    }

    // если было нажатие на тэг с id начинающимся на taskTd_
    if(e.target.id.indexOf('taskTd_') === 0) {
        onEditToDo(e)
    }
}

// добавление нового таска
const addNewToDo = (todo) => {
    const todoTableBody = document.getElementById('todoList');

    // метод create лежит в helper.js
    const todoRow = create('tr', todo.id);
    const btn = create('button', 'deleteBtn_' + todo.id, 'btn btn-danger', 'x');
    const tdWithBtn = create('td');
    const tdWithTask = create('td', 'taskTd_' + todo.id, null, todo.task)
    const tdWithCheckbox = create('td')
    const checkbox = create('input', 'check_' + todo.id, 'checkbox')

    btn.addEventListener('click', deleteToDo);
    tdWithBtn.appendChild(btn)
    checkbox.type = 'checkbox'
    // если было нажатие на чекбокс, делаем перерасчёт футера
    checkbox.addEventListener('change', () => recalculate())
    tdWithCheckbox.appendChild(checkbox) 

    todoRow.appendChild(tdWithTask)
    todoRow.appendChild(tdWithCheckbox)
    todoRow.appendChild(tdWithBtn)  
    todoTableBody.appendChild(todoRow)
}

// удаление таска
const deleteToDo = (e) =>{
    // если открыта форма на редактирование, то хэндлим клик
    if(onEditingState.onEditing) {
        handleClick(e)
    }

    const todoTableBody = document.getElementById('todoList');
    const tr = document.getElementById(e.target.id.replace('deleteBtn_', ''));
    todoTableBody.removeChild(tr)

    // перерасчёт футера
    recalculate()
}

// открытие формы на редактирование
const onEditToDo = (e) => { 
    const id = e.target.id.replace('taskTd_', '');

    // задаём состояние приложения
    onEditingState = {
        onEditing: true,
        previous: e.target.innerText,
        id: id
    }

    // делаем инпут
    const input = create('input', 'editInput_' + id, 'form-control')
    input.type = 'text'
    input.value = e.target.innerText

    // задаём ивент на нажатие хоть одной из кнопок клавиатуры
    input.addEventListener('keypress', keyEnter)
    e.target.innerText = ''
    e.target.appendChild(input)

    // фокусируемся на инпуте
    input.focus()
}

// обработчик нажатия кнопок клавиатуры
const keyEnter = (e) => {
    // если нажат Enter
    if (e.key === "Enter") {
        // получаем td
        const tr = document.getElementById(e.target.id.replace('editInput_', 'taskTd_'));
        // убираем инпут
        tr.removeChild(e.target)
        tr.innerText = e.target.value
        // убираем состояние редактирования
        onEditingState.onEditing = false
    }
}

// перерасчёт футера
const recalculate = () => {
    // получаем все чекбоксы
    let elements = document.getElementsByClassName('checkbox')
    let count = 0;
    // смотрим нажатые чекбоксы
    for(let el of elements) {
        if(el.checked) {
            count++
        }
    }

    // получаем тоталы
    const total = document.getElementById('total')
    const doneTotal = document.getElementById('doneTotal')
    const undoneTotal = document.getElementById('undoneTotal')

    // меняем тоталы
    const undone = elements.length - count;
    total.innerText = 'Итого: ' + elements.length
    doneTotal.innerText = 'Сделано: ' + count
    undoneTotal.innerText = 'Осталось: ' + undone
} 