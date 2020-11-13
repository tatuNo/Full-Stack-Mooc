import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
 
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
          }, 5000)
      })
      .catch(error => {
        if(error.message === 'Request failed with status code 404') {
        setNotification (
          {
            text: `Information of ${obj.name} has already been removed from server`,
            color: 'red'
          }
        )} else {
          setNotification (
            {
              text: `${error.response.data.error}`,
              color: 'red'
            }
          )
        }
        setTimeout(() => {
          setNotification(null)
        },5000)
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
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    })
    .catch(error => {
      setNotification(
        {
          text: `${error.response.data.error}`,
          color: 'red'
        })
      setTimeout(()=> {
        setNotification(null)
      }, 5000)  
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
      }, 5000)
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
