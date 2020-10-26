import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood (good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad (bad + 1)

  const sum = good + bad + neutral
  
  const average = () => { 
    return (good - bad) / sum 
  }

  const positive = () => { 
    return (good / sum) * 100 + '%'
  }
  
  return (
    <div>
      <Header header='give feedback'/>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <Header header='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}
      all={sum} avg={average()} pos={positive()} />
    </div>
  )
}

const Header = ({header}) => <h1>{header}</h1>

const Button = ({handleClick, text}) => (
<button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0)
  return(
    <p>No feedback given</p>
  )

  return(
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.avg} />
      <StatisticLine text="positive" value={props.pos} />
    </table>
  )
} 

const StatisticLine = (props) => {

  return (
    <tbody>
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
    </tbody>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
