import axios from 'axios'
import React, {useState, useEffect} from 'react'
import CountryDetails from './Componenets/CountryDetails'


const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleChange = (e) =>{
    setQuery(e.target.value)
  }

  useEffect(()=>{

    if(query.trim() === ''){
      setCountries([]) //clear the list
      return
    }
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response =>{
        const allCountries = response.data
        const filtered = allCountries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())
      )
      setCountries(filtered)
      setSelectedCountry(null)
      
      })
    
  }, [query])

  return (
    <div>
      <h1>Country Info</h1>
      <div>
        Find countries: <input value={query} onChange={handleChange}/>
        {
          selectedCountry === null && (
            countries.length> 10 ? (
          <p>Too many matches, specify another filter</p>
        ):(countries.length === 1 ? null:(
          <ul>
            {countries.map(country => (
              <li key={country.cca3}>{country.name.common} <button onClick={() => setSelectedCountry(country)}>Show</button></li>
            ))}
          </ul>
        )
          
        )
          )}

        {selectedCountry && (
          <>
          <CountryDetails selectedCountry={selectedCountry} onBack={() => setSelectedCountry(null)}/>   
          </>
        )}
      </div>
    </div>
  )
}

export default App