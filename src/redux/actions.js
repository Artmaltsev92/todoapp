import {ADD_TODO,EDIT_TODO,REMOVE_TODO,GENERATE_ROW,ON_EDIT,TOTAL,DONE,UNDONE } from "./types";

export function addToDO (input) {
    return {
        type: ADD_TODO,
        id:0,
        task: input,
        done: false,
        onEdit: false
        /* todo: {
            id:0,
            task: input,
            done: false,
            onEdit: false
        } */
    }
}
