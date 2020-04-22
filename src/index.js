import './styles.css';
import { createStore } from 'redux';
import { todoHandler } from './redux/rootReducer';
import { addTodo, removeTodo, onEditTodo, onToggleTodo, EditTodo, ResetList } from './redux/actions';
import { check } from './helper'
import { render } from './render'

const form = document.getElementById('todoForm');

const store = createStore(todoHandler)

const clickHandler = (e) => {
    if(e.target.id.indexOf('dlt_') === 0) {
        store.dispatch(removeTodo(e.target.id))
        render(store.getState().todo_list)
    }
    else if(e.target.id.indexOf('edit_') === 0) {
        store.dispatch(onEditTodo(e.target.id))
        render(store.getState().todo_list)
    }
    else if(e.target.id.indexOf('checkbox_') === 0) {
        store.dispatch(onToggleTodo(e.target.id))
        render(store.getState().todo_list)
    }
    else {
        store.dispatch(ResetList())
        render(store.getState().todo_list)
    }
}

const onKeyPress = (e) => {
    if(e.key === 'Enter' && !e.target.id.indexOf('input_')) {
        store.dispatch(EditTodo(e.target.id, e.target.value))
        render(store.getState().todo_list)
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todoNew')
    if(check(input.value)) {
        store.dispatch(addTodo(input.value))
        render(store.getState().todo_list)
    }
    input.value = ''
})

document.addEventListener('click', clickHandler)
document.addEventListener('keypress', onKeyPress)