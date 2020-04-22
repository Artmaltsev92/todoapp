import { combineReducers } from "redux"
import {ADD_TODO,EDIT_TODO,REMOVE_TODO,GENERATE_ROW,ON_EDIT,TOTAL,DONE,UNDONE } from "./types";

const initialState = {
  todo_list: [],
  counter:0
}


export const render = (todo_list) => {
  const tbody = document.getElementById('todoList')
  tbody.innerHTML = ''
  todo_list.forEach(todo => tbody.appendChild(generateRow(todo)))
  const total = document.getElementById('total')
  const donetotal = document.getElementById('doneTotal')
  const undonetotal = document.getElementById('undoneTotal') 
  total.innerText = 'Итого: ' + todo_list.length
  donetotal.innerText = 'Сделано: ' + todo_list.filter(t => t.done).length
  undonetotal.innerText = 'Осталось: ' + todo_list.filter(t => !t.done).length
} 



 let onEditingState = {
  onEditing: false,
  id: 0,
  previous: ''
} 


export function todos (state = initialState,action) {
  switch (action.type) {
    case ADD_TODO:
      state.counter++
      const newState = {...state, 
        todo_list: [
          ...state.todo_list,
          {
            id:state.counter,
            task: action.task,
            done: false
          }], 
      }
      render(newState.todo_list)
      return newState
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


