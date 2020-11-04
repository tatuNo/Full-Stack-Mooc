import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({message}) => {
  if(message === null) {
    return null
  }

  const notificationStyle = {
    color: `${message.color}`,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}

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

const Person = ({name, number,handleDelete}) => {
  return(
    <p>{name} {number}<button onClick={(e) => handleDelete(e,name)}>delete</button></p>
  )
}

const Filter = (props) => {
  return(
    <div>
    search <input
      value={props.filter}
      onChange={props.onChange} />
      </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        <div>
          <div>
          name: <input
          value={props.newName}
          onChange={props.handleNameChange} />
          </div>
          <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState ('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification] = useState(null)
  
  useEffect(() => {
    personService
    .getAll()
    .then(intialPersons=>{
      setPersons(intialPersons)
    })
  },[])
  
  const addPerson = (event) => {
    event.preventDefault()
   
    if(persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const obj = persons.find(person => person.name === newName)
      const changedObj = {...obj, number: newNumber}
      personService
      .update(obj.id, changedObj)
      .then(returnedPerson =>{
        setPersons(persons.map(person => person.id !== obj.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')

        setNotification( 
          {
            text: `Updated ${returnedPerson.name} number`,
            color: 'green'
          }
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
      })
      .catch(error => {
        setNotification (
          {
            text: `Information of ${obj.name} has already been removed from server`,
            color: 'red'
          }
        )
        setTimeout(() => {
          setNotification(null)
        },3000)
      })
    }
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    setNotification(
    {
    text: `Added ${returnedPerson.name}`,
    color: 'green'
    }
    )
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    })
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setFilter(event.target.value) 
  }

  const handleDelete = (event,name) => {
    event.preventDefault()

    if(window.confirm(`Delete ${name} ?`)) {
    const obj = persons.find(person => person.name === name)
    personService
    .remove(obj.id)
    .then(returnedPerson => {
      console.log(returnedPerson)
      const personsList = persons.filter(person => person.id !== obj.id)
      setPersons(personsList)
    })
    setNotification(
      {
      text:`Deleted ${name}`,
      color: 'green'
      }
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter filter={filter} onChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App;
