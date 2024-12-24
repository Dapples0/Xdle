import { useEffect, useState } from 'react'
import './App.css'
import { generateX } from './functions/x'
import { contains} from './functions/hints'
import { addHintContains, addHintEquality, addHintGcd, addHintLength, addHintMultiple, addHintRange, hints } from './hintsDiv'

const victoryMessage = "You found X!";
const victoryComment1 = "On your first attempt too!";
const victoryComment2 = "nice";
const victoryComment3 = "Well that took you a while...";
const victoryComment4 = "Only had to go through all possible options!";


function App() {
  // Initialise state variables
  const [x] = useState(generateX());
  const [inputX, setInputX] = useState('');
  const [result, setResult] = useState('');
  const [comment, setComment] = useState('');
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
  const [containsY, setContainsY] = useState<string[]>([]);
  const [inputHistory, setInputHistory] = useState(['']);

  /**
   * Checks if input results in victory or not and processes result accordingly
   */
  function enterClick() {
    // Error handling for empty input or input has already been done
    if (inputX.length === 0 || inputHistory.includes(inputX)) {
      return;
    }

    // On successful input set state to victory
    if (foundX || validateX()) {
      setFoundX(true);
      setResult(victoryMessage);
      addComment();
      return;
    }

    // Add input to history
    appendAttemptHistory();

    // Add hints
    addHints();
  };

  /**
   * Validates inputX solution
   */
  function validateX() {
    if (x.toString() === inputX) {
      return true;
    }

    return false;
  }

  /**
   * Adds hint on incorrect input
   */
  function appendAttemptHistory() {
    const newAttemptDiv = document.createElement('div');
    const attemptDiv = document.getElementById('history-text')!;
    newAttemptDiv.setAttribute('class', 'history-text-container');
    newAttemptDiv.appendChild(document.createTextNode(inputX));
    attemptDiv.appendChild(newAttemptDiv);
    setNumAttempts(numAttempts + 1);
    setInputHistory([...inputHistory, inputX]);
  }

  /**
   * Appends hints to div
   */
  function addHints() {
    const appendHint: hints = {
      range: [],
      multiple: [],
      length: '',
      gcd: [],
      contains: [],
      lessOrGreater: [],
    };

    // Creates respective divs for hints
    addHintRange(appendHint, hintResults, x, inputX);
    addHintEquality(appendHint, hintResults, x, inputX);
    addHintMultiple(appendHint, hintResults, x, inputX);
    addHintLength(appendHint, hintResults, x, inputX);
    addHintGcd(appendHint, hintResults, x, inputX);
    let listContains = contains(x, parseInt(inputX)).sort();
    listContains = [...containsY, ...makeUnique(containsY, listContains)]
    setContainsY(listContains.sort());
    addHintContains(appendHint, listContains);

    // Updates hint state variable
    setHintResults({
      range: [...hintResults.range, ...appendHint.range],
      multiple: [...hintResults.multiple, ...appendHint.multiple],
      length: appendHint.length,
      gcd: [...hintResults.gcd, ...appendHint.gcd],
      contains: listContains,
      lessOrGreater: [...hintResults.lessOrGreater, ...appendHint.lessOrGreater]
    })
  }

  /**
   * Checks state before input concatenation
   */
  function enterInput(input:string, add:string) {
    // No inputs can be done on victory state
    if (foundX) {
      return;
    }

    setInputX(addInput(input, add));
  }

  /**
   * Handles input concatenation
   */
  function addInput(inputX: string, input: string): string {
    if (inputX === "0") {
        return inputX
    }

    if (inputX.length < 5) {
        return inputX + input;
    }
    return inputX;
  }

  /**
   * Handles removing last input
   */
  function removeInput(input:string) {
    if (foundX) {
      return;
    }

    setInputX(input.slice(0,-1));
  }

  /**
   * Appends victory comment div with a new message under specific attempt conditions
   */
  function addComment() {
    if (numAttempts === 0) {
      setComment(victoryComment1);
    } else if (numAttempts === 69) {
      setComment(victoryComment2);
    } else if (numAttempts >= 50) {
      setComment(victoryComment3);
    } else if (numAttempts >= 999999) {
      setComment(victoryComment4);
    }
  }

  /**
   * Creates a new distinct intersection array from two arrays
   */
  function makeUnique(array: string[], append: string[]): string[] {
    const newArray: string[] = [];
    append.forEach((hint) => {
        if (!array.includes(hint)) {
            newArray.push(hint);
        }
    });

    return newArray;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText(generateX().toString());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id='left-container'>
        <div id='tip-container'>
          <div id='tip-title'>
            <h2>how to play</h2>
          </div>
          <div id='tip-description'>
            <p>Find X.</p>
            <p>X will be an integer between 0 and 99,999 (inclusive). Incorrect X will give hints.</p>
          </div>
        </div>
        <div id='history-container'>
          <div id='history-title'>History</div>
          <div id='history-text'></div>
        </div>
      </div>
      <div id='centre-container'>
        <div id='top-centre-container'>
          <div id='results-text'>{result}</div>
          <div id='results-comment'>{comment}</div>
        </div>
        <div id='middle-centre-container'>
          <div id="input-container">
            <h1 id='x-is'>
              &nbsp;X is&nbsp;
            </h1>
            <h1 id='x-input' data-placeholder={placeholderText}>
              {inputX}
            </h1>
          </div>
          <div id="button-container">
            <div id="button-items">
              <button className="numButton" onClick={() => enterInput(inputX, '1')} >1</button>
              <button className="numButton" onClick={() => enterInput(inputX, '2')} >2</button>
              <button className="numButton" onClick={() => enterInput(inputX, '3')} >3</button>
              <button className="numButton" onClick={() => enterInput(inputX, '4')} >4</button>
              <button className="numButton" onClick={() => enterInput(inputX, '5')} >5</button>
              <button className="numButton" onClick={() => enterInput(inputX, '6')} >6</button>
              <button className="numButton" onClick={() => enterInput(inputX, '7')} >7</button>
              <button className="numButton" onClick={() => enterInput(inputX, '8')} >8</button>
              <button className="numButton" onClick={() => enterInput(inputX, '9')} >9</button>
              <button className="numButton" onClick={() => removeInput(inputX)} >Back</button>
              <button className="numButton" onClick={() => enterInput(inputX, '0')} >0</button>
              <button className="numButton" onClick={() => enterClick()}>Enter</button>
            </div>
          </div>
        </div>
        <div id='bot-centre-container'>
          <div id='attempts-container'>
              <h1>Attempts: {numAttempts}</h1>
          </div>
        </div>
      </div>
      <div id='right-container'>
        <div id='hint-text'>
          <div id='hint-title'>
            <h2>hints</h2>
          </div>
          <div id='hint-description'>
            <div className='hint-text-container'>{hintResults.length}</div>
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
