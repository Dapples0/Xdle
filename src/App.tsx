import { useEffect, useState } from 'react'
import './App.css'
import { generateX, addInput, checkInput } from './getX/x'
import { multiple, withinRange, contains, length, gcd, lessOrGreaterThan } from './getX/hints'
import { makeUnique } from './getX/createHints'
import { HintsX } from './HintsX'

interface hints {
  range: string[],
  multiple: string[],
  length: string,
  gcd: string[],
  contains: string[],
  lessOrGreater: string[],
}

function App() {
  const [x] = useState(generateX());
  const [inputX, setInputX] = useState('');
  const [result, setResult] = useState('');

  const [placeholderText, setPlaceholderText] = useState(generateX().toString());

  const [foundX, setFoundX] = useState(false);

  const [numAttempts, setNumAttempts] = useState(0);

  const [hintResults, setHintResults] = useState<hints>({
    range: [],
    multiple: [],
    length: '',
    gcd: [],
    contains: [],
    lessOrGreater: [],
  });

  const [containsY, setContainsY] = useState<string[]>([])

  const hintsClass = new HintsX()

  function enterClick(hintsClass: HintsX) {
    if (foundX || checkX()) {
      setFoundX(true);
      setResult("You found X")
      return;
    }
    setNumAttempts(numAttempts + 1);

    addHints(hintsClass)
  };

  const checkX = () => {
    if (checkInput(x.toString(), inputX)) {
      return true;
    }

    return false;
  }

  function addHints(hintsClass: HintsX) {
    let appendHint: hints = {
      range: [],
      multiple: [],
      length: '',
      gcd: [],
      contains: [],
      lessOrGreater: [],
    };

    hintsClass.addHintRange(appendHint, hintResults, x, inputX);
    hintsClass.addHintEquality(appendHint, hintResults, x, inputX);
    hintsClass.addHintMultiple(appendHint, hintResults, x, inputX);
    hintsClass.addHintLength(appendHint, hintResults, x, inputX);
    hintsClass.addHintGcd(appendHint, hintResults, x, inputX);

    let listContains = contains(x, parseInt(inputX)).sort();
    listContains = [...containsY, ...makeUnique(containsY, listContains)]
    setContainsY(listContains.sort());
    hintsClass.addHintContains(appendHint, listContains);

    setHintResults({
      range: [...hintResults.range, ...appendHint.range],
      multiple: [...hintResults.multiple, ...appendHint.multiple],
      length: appendHint.length,
      gcd: [...hintResults.gcd, ...appendHint.gcd],
      contains: listContains,
      lessOrGreater: [...hintResults.lessOrGreater, ...appendHint.lessOrGreater]
    })
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText(generateX().toString());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id='tip-container'>
        <div id='tip-text'>
          <div id='tip-title'>
            <h2>how to play</h2>
          </div>
          <div id='tip-description'>
            <p>Find X.</p>
            <p>X will be an integer between 0 and 999,999 (inclusive). Incorrect X will give hints.</p>
          </div>
        </div>
      </div>
      <div id='centre-container'>
        <div id='top-centre-container'>
          <div id='results-text'>
            <p>{result}</p>
          </div>
        </div>
        <div id='middle-centre-container'>
          <div id="input-container">
            <h1 id='x-is'>
              X is
            </h1>
            <h1 id='x-input' data-placeholder={placeholderText + '?'}>
              {inputX}
            </h1>
          </div>
          <div id="button-container">
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
            <button className="numButton" onClick={() => enterClick(hintsClass)}>Enter</button>
          </div>
        </div>
        <div id='bot-centre-container'>
          <div>
              <p>{x}</p>
              <p>Attempts: {numAttempts}</p>
          </div>
        </div>
      </div>
      <div id='hint-container'>
        <div id='hint-text'>
          <div id='hint-title'>
            <h2>hints</h2>
          </div>
          <div id='hint-description'>
            <div id='hint-length'>{hintResults.length}</div>
            <div id='hint-contains'></div>
            <div id='hint-range'></div>
            <div id='hint-equality'></div>
            <div id='hint-multiple'></div>
            <div id='hint-gcd'></div>
          </div>
        </div>
      </div>
      <script>
      </script>
    </>
  )

}


export default App
