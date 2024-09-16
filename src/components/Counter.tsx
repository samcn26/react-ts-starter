import { useState } from 'react'

const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}

export default Counter
