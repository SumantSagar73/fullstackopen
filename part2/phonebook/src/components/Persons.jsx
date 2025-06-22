import React from 'react'

const Persons = ({persons, deleteNote}) => {
  return (
    <ul style={{listStyleType: 'none', paddingLeft: 0}}>
        {persons.map((person) =>(
          <li key={person.id}>{person.name}  {person.number}
          <button onClick={() => deleteNote(person.id)} style={{ marginLeft: '1rem', color: 'red' }}>delete</button> 
          </li>
        ))}
      </ul>
  )
}

export default Persons