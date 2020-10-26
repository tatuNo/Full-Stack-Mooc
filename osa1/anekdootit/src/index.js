import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState (new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))

  console.log(points)
  const randomSelect = () => {
  setSelected((Math.floor(Math.random() * anecdotes.length)))
  }

  const pointIncrease = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = points.indexOf(Math.max(...points))
  

  return (
    <div>
      <Header header="Anecdote of the day"/>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
      <Button handleClick={randomSelect} text='Next anecdote'/>
      <Button handleClick={pointIncrease} text='Vote'/>
      <Header header="Anecdote with the most votes"/>
      {props.anecdotes[mostVotes]}
      </div>
    </div>
  )
}

const Header = ({header}) => <h1>{header}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)