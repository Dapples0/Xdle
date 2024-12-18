import { useEffect, useState } from 'react'
import './App.css'
import { generateX, addInput, checkInput } from './getX/x'

function App() {
  const [x] = useState(generateX())
  const [inputX, setInputX] = useState('');
  const [result, setResult] = useState('');

  const [placeholderText, setPlaceholderText] = useState(generateX().toString());

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText(generateX().toString());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='tip-container'>
        <div className='tip-text'>
          <div className='tip-title'>
            <h2>how to play</h2>
          </div>
          <div className='description'>
            <p>Find X.</p>
            <p>X will be an integer between 0 and 999,999 (inclusive). Incorrect X will give hints.</p>
          </div>
        </div>
      </div>
      <div id='centre-container'>
        <div className="input-container">
          <h1 className='x-is'>
            X is
          </h1>
          <h1 className='x-input' data-placeholder={placeholderText + '?'}>
            {inputX}
          </h1>
        </div>
        <div className="button-container">
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '1')})} >1</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '2')})} >2</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '3')})} >3</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '4')})} >4</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '5')})} >5</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '6')})} >6</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '7')})} >7</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '8')})} >8</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '9')})} >9</button>
          <button className="numButton" onClick={() => setInputX((inputX) => inputX.slice(0,-1))} >Back</button>
          <button className="numButton" onClick={() => setInputX((inputX) => {return addInput(inputX, '0')})} >0</button>
          <button className="numButton" onClick={() => setResult((result) => {return checkInput(inputX, x)})}>Enter</button>
        </div>
        <div>
          <p>{x}</p>
          <p>
            {result}
          </p>
        </div>
      </div>
      <div className='hint-container'>
        <h1>hint</h1>
      </div>
    </>
  )
}

export default App
