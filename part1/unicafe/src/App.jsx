import React, { useState } from 'react'

const Button = ({onClick, text}) =>{
  return(
    <button onClick={onClick}>{text}</button>
  )
  

}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
)
  
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad;
    const average = (good - bad) / (total || 1)
    const positive = (good / (total || 1)) * 100
    if(total === 0){
      return(
        <p>No Feedback Given</p>
      )
    }
    return(
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <StatisticLine text = "Good" value= {good}/>
        <StatisticLine text = "Neutral" value= {neutral}/>
        <StatisticLine text = "Bad" value= {bad}/>
        <StatisticLine text = "All" value= {total}/>
        <StatisticLine text = "Average" value= {average}/>
        <StatisticLine text = "Positive" value= {`${positive} %`}/>
        </tbody>
      </table>
      

    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick= {() => setGood(good +1)} text="Good"/>
      <Button onClick= {() => setNeutral(neutral +1)} text="Neutral"/>
      <Button onClick= {() => setBad(bad +1)} text="Bad"/>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
      
      
    </div>
  )
}

export default App