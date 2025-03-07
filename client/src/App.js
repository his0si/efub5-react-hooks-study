import React, { useState } from 'react';
import './App.css';
import useCounter from './hooks/useState';
import useInput from './hooks/useInput';
import useTabs from './hooks/useTabs';

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
];

function App() {
  const { item, increment, decrement } = useCounter(1);
  const name = useInput('Mr.');
  const { currentItem, changeItem } = useTabs(0, content);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Item: {item}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <input placeholder="Name" {...name} />
        <div>
          {content.map((section, index) => (
            <button key={index} onClick={() => changeItem(index)}>
              {section.tab}
            </button>
          ))}
        </div>
        <div>
          {currentItem ? currentItem.content : "No Content"}
        </div>
      </header>
    </div>
  );
}

export default App;
