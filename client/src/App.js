import React, { useEffect, useState } from 'react';
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
  const sayHello = () => console.log("Hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setANumber] = useState(0);
  useEffect(sayHello, [number]);

  const useTitle = (initialTitle) => {
    const [title, setTitle] = useState(initialTitle);
    
    useEffect(() => {
      document.title = title;
    }, [title]);

    return setTitle;
  };

  const TitleUpdater = useTitle("Loading...");

  useEffect(() => {
    const timer = setTimeout(() => {
      TitleUpdater("Home");
    }, 5000);
    
    return () => clearTimeout(timer); // Cleanup to avoid memory leaks
  }, [TitleUpdater]);

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
          <button onClick={() => setNumber(number + 1)}>{number}</button>
          <button onClick={() => setANumber(aNumber + 1)}>{aNumber}</button>
        </div>
        <div>
          {currentItem ? currentItem.content : "No Content"}
        </div>
      </header>
    </div>
  );
}

export default App;
