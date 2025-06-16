import React from 'react'

const Header = ({course}) => {
  return(
    <div>
      <h1>{course}</h1>
    </div>
  )
}
const Part = ({parts}) => {
  return <p>{parts.name} {parts.exercises}</p>
}
const Content = ({parts}) => {
  return(
    <div>
      <Part parts={parts[0]}/>
      <Part parts={parts[1]}/>
      <Part parts={parts[2]}/>
    </div>
  )
}
const Total = ({parts}) => {
    const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return(
    <div>
      <p>Number of exercise {total}</p>
    </div>
  )
}



const App = () => {
  const course = {
   name:'Half Stack application development',

  parts : [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
{
    name:'Using props to pass data',
    exercises:7
  },
  {
    name: 'State of a component',
    exercises: 14
  }

  ]
  } 




  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App