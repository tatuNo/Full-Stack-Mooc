import React from 'react'

const Course = ({ course }) => {
    return (
      <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce( (a,b) => a + b.exercises, 0)
    
    return(
      <p><strong>total of exercises {sum}</strong></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part part={part} key={part.id} />
          )}
      </div>
    )
  }

  export default Course