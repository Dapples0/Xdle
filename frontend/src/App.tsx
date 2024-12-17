import { useState } from 'react'
import './App.css'
import { generateX } from './getX/x'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>X is {generateX()}</h1>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
