import React from 'react'
import Person from './Person'

const Persons = ({persons,filter, handleDelete}) => {
    const filteredPersons = persons.filter(person =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))  
    const personsToDisplay = filter ? filteredPersons : persons
  
    return(
      <div>
      {personsToDisplay.map(person =>
        <Person key={person.name} name={person.name} number={person.number} handleDelete={handleDelete} /> 
        )}
      </div>
    )
  }

  export default Persons