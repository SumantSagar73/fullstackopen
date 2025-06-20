import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() =>{
    console.log('effect')

    axios
      .get('http://localhost:3001/persons').then(response =>{
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
  }

  const filteredPerson = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))
  

  const addPerson = (event) =>{
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if(nameExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length +1),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber (event.target.value)

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
      <Persons persons= {filteredPerson}/>      
    </div>
  )
}

export default App