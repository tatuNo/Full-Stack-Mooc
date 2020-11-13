import React from 'react'

const Person = ({name, number,handleDelete}) => {
    return(
      <p>{name} {number}<button onClick={(e) => handleDelete(e,name)}>delete</button></p>
    )
  }

export default Person