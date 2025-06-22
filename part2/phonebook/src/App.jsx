import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() =>{
    personService
      .getAll()
      .then(
        response =>{
        setPersons(response.data)
  })
  }, [])

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
  }

  const filteredPerson = persons.filter(person =>person.name && person.name.toLowerCase().includes(filterTerm.toLowerCase()))
  

  const addPerson = (event) =>{
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson){
      const confirmUpdate = window.confirm(    `${newName} is already added to phonebook, replace the old number with a new one?`)

      if(confirmUpdate){
        const updatedPerson = {...existingPerson, number : newNumber}
      

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(p => p.id === existingPerson.id ? returnedPerson: p)
          )
          setNewName('')
          setNewNumber('')
        })
        .catch(error =>{
        alert(`Information of ${newName} was already removed from the server`)
        setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  

  }

  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber (event.target.value)

  }

  const deletePerson = (id) =>{
    const person = persons.find(n => n.id === id)
    if(!person) return

    const confirmDelete = window.confirm(`Delete person: "${person.name}"?`)
    if( !confirmDelete) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
      .catch(() => {
        alert(`The person "${person.name}" was already deleted on the server`)
        setPersons(persons.filter(n => n.id !== id)) // clean up locally too
      })
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value= {filterTerm}
      onChange={handleFilterChange}/>


      <h2>add a new</h2>

      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons 
        persons= {filteredPerson}
        deleteNote={deletePerson}
      />      
    </div>
  )
}

export default App