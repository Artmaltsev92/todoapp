import { ADD_TODO, REMOVE_TODO, ON_EDIT, TOGGLE, EDIT_TODO } from "./types";

const initialState = {
  todo_list: [],
  counter: 0,
}

export function todoHandler (state = initialState, action) {
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