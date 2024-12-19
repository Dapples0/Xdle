import { useEffect, useState } from 'react'
import './App.css'
import { generateX, addInput, checkInput } from './getX/x'
import { multiple, withinRange, contains, length, gcd, lessOrGreaterThan } from './getX/hints'
import { makeUnique } from './getX/createHints'

function App() {
  const [x] = useState(generateX())
  const [inputX, setInputX] = useState('');
  const [result, setResult] = useState('');

  const [placeholderText, setPlaceholderText] = useState(generateX().toString());

  const [foundX, setFoundX] = useState(false);

  const [numAttempts, setNumAttempts] = useState(0);

  const [hintResults, setHintResults] = useState({
    range: [''],
    multiple: [''],
    length: '',
    gcd: [''],
    contains: [''],
    lessOrGreater: [''],
  });

  const [containsY, setContainsY] = useState([''])

  const enterClick = () => {
    setNumAttempts(numAttempts + 1);
    let appendHint = {
      range: [''],
      multiple: [''],
      length: '',
      gcd: [''],
      contains: [''],
      lessOrGreater: [''],
    };

    // Range
    appendHint.range.push(withinRange(x, parseInt(inputX)));
    const newRangeDiv = document.createElement('div');
    const rangeDiv = document.getElementById('hint-range')!;
    for (let r of makeUnique(hintResults.range, appendHint.range)) {
      newRangeDiv.appendChild(document.createTextNode(r));
      rangeDiv.appendChild(newRangeDiv);
    }

    // Equality
    appendHint.lessOrGreater.push(lessOrGreaterThan(x, parseInt(inputX)));
    const newEqualityDiv = document.createElement('div');
    const equalityDiv = document.getElementById('hint-equality')!;
    for (let e of makeUnique(hintResults.lessOrGreater, appendHint.lessOrGreater)) {
      newEqualityDiv.appendChild(document.createTextNode(e));
      equalityDiv.appendChild(newEqualityDiv);
    }

    // Multiple
    appendHint.multiple.push(multiple(x, parseInt(inputX)));
    const newMultipleDiv = document.createElement('div');
    const multipleDiv = document.getElementById('hint-multiple')!;
    for (let m of makeUnique(hintResults.multiple, appendHint.multiple)) {
      newMultipleDiv.appendChild(document.createTextNode(m));
      multipleDiv.appendChild(newMultipleDiv);
    }

    // Length
    if (hintResults.length.length === 0) {
      appendHint.length = length(x, parseInt(inputX));
    } else {
      appendHint.length = hintResults.length;
    }

    // gcd
    appendHint.gcd.push(gcd(x, parseInt(inputX)));
    const newGcdDiv = document.createElement('div');
    const gcdDiv = document.getElementById('hint-gcd')!;
    for (let g of makeUnique(hintResults.gcd, appendHint.gcd)) {
      newGcdDiv.appendChild(document.createTextNode(g));
      gcdDiv.appendChild(newGcdDiv);
    }

    // Contains
    let listContains = contains(x, parseInt(inputX)).sort();
    listContains = [...containsY, ...makeUnique(containsY, listContains)]
    setContainsY(listContains.sort());
    appendHint.contains.push(...listContains);
    const newContainsDiv = document.createElement('div');
    const containsDiv = document.getElementById('hint-contains')!;
    containsDiv.innerHTML = '';
    let containsStr = "Contains "
    for (let c of listContains) {
      if (c.length === 0) {
        continue;
      } else if (listContains.indexOf(c) === listContains.length - 1) {
        containsStr += c;
      } else {
        containsStr += c + ", ";
      }

    }
    newContainsDiv.appendChild(document.createTextNode(containsStr));
    containsDiv.appendChild(newContainsDiv);
    setHintResults({
      range: [...hintResults.range, ...makeUnique(hintResults.range, appendHint.range)],
      multiple: [...hintResults.multiple, ...makeUnique(hintResults.multiple, appendHint.multiple)],
      length: appendHint.length,
      gcd: [...hintResults.gcd, ...makeUnique(hintResults.gcd, appendHint.gcd)],
      contains: listContains,
      lessOrGreater: [...hintResults.lessOrGreater, ...makeUnique(hintResults.lessOrGreater, appendHint.lessOrGreater)]
    })


  };


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
          <button className="numButton" onClick={enterClick}>Enter</button>
        </div>
        <div>
          <p>{x}</p>
          <p>Attempts: {numAttempts}</p>
          <p>{result}</p>
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
