export const render = (todo_list) => {
    const tbody = document.getElementById('todoList')
    tbody.innerHTML = ''
    todo_list.forEach(todo => tbody.appendChild(generateRow(todo)))
    
    if(todo_list.find(x => x.onEdit)) {
      document.getElementById('input_' + todo_list.find(x => x.onEdit).id).focus()
    }
  
    document.getElementById('total').innerText = 'Итого: ' + todo_list.length
    document.getElementById('doneTotal').innerText = 'Сделано: ' + todo_list.filter(t => t.done).length
    document.getElementById('undoneTotal').innerText = 'Осталось: ' + todo_list.filter(t => !t.done).length
} 

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
    <td><input id=${'checkbox_' + todo.id} type="checkbox" ${ todo.done && 'checked'}></td>
    <td><button class="btn btn-danger" id=${'dlt_' + todo.id}>x</button></td>`
        
    return todoRow
}