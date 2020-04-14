import { ADD_TODO, REMOVE_TODO, COMPLETE_TODO, UPDATE_TODO } from "./types";

export function addToDO (text) {
    return {
        type: ADD_TODO,
        text
    }
}

export function toggleToDo (index) {
    return {
        type: TOGGLE_TODO,
        index
    }
}    

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}