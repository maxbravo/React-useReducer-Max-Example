import { useReducer } from "react";

function App() {

  //Defino los casos del reducer
  const types = {
    typeIncrement : 'Increment',
    typeDecrement : 'Decrement',
    typeReset : 'Reset',
  }
  // Creo el objeto con el estado inicial
  const initState = {count : 0};
  // Se crea el reducer, por defecto viene el state y el action que tiene el type y payload
  const reducerCounter = (state, action) => {
    switch (action.type) {
      case types.typeIncrement:
           return {...state, count: state.count + 1} ;
      case types.typeDecrement:
           return {...state, count: state.count - 1} ;
      case types.typeReset:
           return action.payload ;
       default:
        return state;
    }
  }
  //Declaro el useReducer
  const [counter, dispatchCounter] = useReducer(reducerCounter, initState);

  return (
    <div>
      <h1>Reducer Example With Counter App</h1>
      <hr/>

      <p>Current Value = { counter.count }</p>

      <button
        className="btn btn-primary"
        onClick={ () => { dispatchCounter({type: types.typeIncrement}) }}
      >
        Increment
      </button>
      <button
        className="btn btn-danger"
        onClick={ () => { dispatchCounter({type: types.typeDecrement}) }}
      >
        Decrement
      </button>
      <button
        className="btn btn-secondary"
        onClick={ () => { dispatchCounter({type: types.typeReset, payload: initState}) }}
      >
        Reset
      </button>

    </div>
  );
}

export default App;
