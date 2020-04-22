import {ADD_TODO, EDIT_TODO, REMOVE_TODO, ON_EDIT, TOGGLE, RESET } from "./types";

export function addTodo (input) {
    return {
        type: ADD_TODO,
        todo: {
            id:0,
            task: input,
            done: false,
            onEdit: false
        } 
    }
}

export function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id: +id.replace('dlt_', '')
    }
}

export function onEditTodo(id) {
    return {
        type: ON_EDIT,
        id: +id.replace('edit_', '')
    }
}

export function onToggleTodo(id) {
    return {
        type: TOGGLE,
        id: +id.replace('checkbox_', '')
    }
}

export function EditTodo(id, task) {
    return {
        type: EDIT_TODO,
        id: +id.replace('input_', ''),
        task
    }
}

export function ResetList() {
    return {
        type: RESET
    }
}