import React, { useReducer, useRef } from 'react';

export const Todo = () => {

    const initListState = [{id: 0, task: '', status: false}];

    const inputAdd = useRef(null);
    
    const types = {
        typeAdd : 'AddTask',
        typeRemove : 'RemoveTask',
        typeUpdate : 'UpdateTask'
    }
    
    const reducerTodolist = (state, action) => {
        switch (action.type) {
            case (types.typeAdd):
                return [...state,action.payload];
            case (types.typeRemove):
                return state.filter(item => item !== action.payload);
            case (types.typeUpdate):
                return state.map(item => item.id === action.payload.id ? action.payload : item);
            default:
                return state;
        }
    }
    
    const [stateTodolist, dispatchTodoList] = useReducer(reducerTodolist, initListState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchTodoList({
            type: types.typeAdd,
            payload: {id: Date.now(), task: inputAdd.current.value, status: false}
        });
    }

    const handleDelete = (item) => {
        dispatchTodoList({
            type: types.typeRemove, 
            payload: item
        });
    }

    const handleUpdate = (item) => {
        dispatchTodoList({
            type: types.typeUpdate, 
            payload: {...item, task: inputAdd.current.value}
        });        
    }

  return (
    <div>
      <h1>To Do List</h1>
      <hr/>
      <div>
          <h2>Add Task</h2>
          <form>
              <input 
                ref={inputAdd}
                type="text"
              />
              <button
                className='btn btn-primary'
                type='Submit'
                onClick={handleSubmit}
              >Add</button>
          </form>
      </div>
      <hr/>
      <div>
        <h2>Current Tasks</h2>
        { 
            stateTodolist.map( item => (
                <li key={ item.id }>
                    { item.task }
                    <button 
                    className='btn btn-danger'
                    type="button"
                    onClick={ () => handleDelete(item) }                    
                    >
                        Delete
                    </button>
                    <button 
                    className='btn btn-secondary'
                    type="button"
                    onClick={ () => handleUpdate(item) }                    
                    >
                        Update
                    </button>                    
                </li>

            ))
        
        }
      </div>

  </div>)
};
