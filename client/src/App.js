import React from 'react';
import './App.css';
import useCounter from './hooks/useState';
import useInput from './hooks/useInput';

function App() {
  const { item, increment, decrement } = useCounter(1);
  const name = useInput('Mr.');

  return (
    <div className="App">
      <header className="App-header">
        <h2>Item: {item}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <input placeholder="Name" {...name} />
      </header>
    </div>
  );
}

export default App;
