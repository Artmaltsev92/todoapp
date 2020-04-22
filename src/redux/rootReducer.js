import { ADD_TODO, REMOVE_TODO, ON_EDIT, TOGGLE, EDIT_TODO } from "./types";

const initialState = {
  todo_list: [],
  counter: 0,
}

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

export function todos (state = initialState, action) {
  switch (action.type) {

    case ADD_TODO:
      state.counter++;
      action.todo.id = state.counter;
      return {
        ...state, 
        todo_list: [
          ...state.todo_list,
          action.todo
        ]
      }
      
    case REMOVE_TODO:
      return {
        ...state,
        todo_list: [...state.todo_list.filter(x => x.id !== action.id)]
      }
      
    case ON_EDIT:
      if(state.todo_list.find(x => x.onEdit)) {
        const todoOnEditFalse = state.todo_list.find(x => x.onEdit)
        todoOnEditFalse.onEdit = false
      }
      const todoOnEdit = state.todo_list.find(x => x.id === action.id)
      todoOnEdit.onEdit = true
      return state

    case TOGGLE:
      const todoDone = state.todo_list.find(x => x.id === action.id)
      todoDone.done = !todoDone.done
      return state

    case EDIT_TODO:
      const todoEdit = state.todo_list.find(x => x.id === action.id)
      todoEdit.task = action.task
      todoEdit.onEdit = false
      return state

    default:
      return state
    }
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