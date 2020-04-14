import './styles.css';

const form = document.getElementById('todoForm');
let counter = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    counter++;
    const todoObj = {
        id: counter,
        task: document.getElementById('todoNew').value,
        done: false
    }

    addNewToDo(todoObj)
})

const addNewToDo = (todo) => {
    const todoTableBody = document.getElementById('todoList');

    const todoRow = document.createElement('tr');
    todoRow.setAttribute('id', todo.id);

    //TODO: добавить редактирование
    todoRow.addEventListener('click', () => {
        console.log('Edit me!')
        editToDo
    })

    const btn = document.createElement('button');
    const td = document.createElement('td');

    btn.setAttribute('id', todo.id);
    btn.addEventListener('click', deleteToDo);
    btn.innerText = 'Del'
    btn.setAttribute('class', 'btn btn-danger')
    td.appendChild(btn)

    todoRow.innerHTML = `<td>${todo.task}</td>
        <td>
            <input type="checkbox" ${ todo.done && 'checked'}>
        </td>`
        
    todoRow.appendChild(td)
    todoTableBody.appendChild(todoRow)
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
