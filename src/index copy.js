import './styles.css';
import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todos } from './redux/rootReducer';
import thunk from 'redux-thunk';
import {ADD_TODO,EDIT_TODO,REMOVE_TODO,GENERATE_ROW,ON_EDIT,TOTAL,DONE,UNDONE } from "./redux/types";
import logger from 'redux-logger';
import {addToDO} from './redux/actions';

const form = document.getElementById('todoForm');


const store = createStore(todos)

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('todoNew').value
    store.dispatch(addToDO(input))
    console.log(store.getState())
})




