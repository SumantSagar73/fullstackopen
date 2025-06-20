import React from 'react'

const Persons = ({persons}) => {
  return (
    <ul style={{listStyleType: 'none', paddingLeft: 0}}>
        {persons.map((person) =>(
          <li key={person.id}>{person.name}  {person.number}</li>
        ))}
      </ul>
  )
}

export default Persons