import {useEffect, useState}from 'react'
import axios from 'axios'

const CountryDetails = ({selectedCountry, onBack}) => {
  const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const capital = selectedCountry.capital?.[0]


    useEffect(()=>{
      if(!capital) return
      axios
        .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

        )
        .then((response) =>{
          setWeather(response.data)
          console.log(response.data)
        })
        .catch((error) =>{
          console.log("Failed to fetch weather:", error)
        })
      console.log("Fetching weather for", capital);
      
    }, [capital])

  return (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <h3>Languages: </h3>
      <ul>
        {Object.values(selectedCountry.languages).map((lang, index) => (
        <li key = {index}>{lang}</li>
        ))}
      </ul>
      <img src={selectedCountry.flags.png} alt= "flag" width={150} />
      {weather &&(
        <div>
          <h3>Weather in {capital}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <img
            src= {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Wind:</strong>{weather.wind.speed} m/s</p>
        </div>
      )}
      <button onClick={onBack}>Back</button>
    </div>
  )
}

export default CountryDetails