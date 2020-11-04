import React,{useState,useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Search = (props) => {

  return(
    <>
    find countries <input
    onChange={props.onChange}
    value={props.value} />
    </>
  )
}

const Countries = (props) => {
  const filteredCountries = props.countries.filter(country =>
  country.name.toLocaleLowerCase().includes(props.searchTerm.toLocaleLowerCase()))

  if(filteredCountries.length > 10)
  return(
    <p>Too many countries specify your filter</p>
  )

  if(filteredCountries.length <= 10 && filteredCountries.length > 1)
  return(
    <div>
    {filteredCountries.map(country => 
      <p key={country.name}>{country.name} <button onClick={() => props.handleShowClick(country.name)}>show</button></p>
      )}
      </div>
  )
  if(filteredCountries.length === 1)  
  return (
    <div>
      <Country countries={filteredCountries} setWeather={props.setWeather} weather={props.weather} />
    </div>
  )
  return(
    <p></p>
  )
}

const Country = ({countries, setWeather, weather}) => {
    
  return (
    <>
    <h2>{countries[0].name}</h2>
    <p>Capital {countries[0].capital}</p>
    <p>population {countries[0].population}</p>
    <h3>languages</h3>
    <ul>
      {countries[0].languages.map(language =>
        <li key={language.name}>{language.name}</li>
        )}
    </ul>
    <div>
    <img style={{width: 175, height: 175}}  src={countries[0].flag} alt="Country flag" />
    </div>
    <Weather capital={countries[0].capital} setWeather={setWeather} weather={weather} />
      </>
  )
}

const Weather = ({capital,setWeather,weather}) => {
  
  useEffect(() => {
    console.log('weather fetching data')
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
    .then(response => {
      setWeather(response.data)
      console.log('weather response ', response.data)
    })
  },[capital]
  )

  if(!(weather.length === 0))
  return(
    <div>
    <h2>Weather in {capital}</h2>
    <p><strong>temperature:</strong>{weather.main.temp}F</p>
    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    <p><strong>wind:</strong>{weather.wind.speed}m/s wind degree: {weather.wind.deg}</p>
    </div>
  )
  else
  return (
    <p></p>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState ([])
  

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  },[]
  )

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowClick = (name) => {
    setSearchTerm(name)
  }

  return (
    <div>
     <Search value={searchTerm} onChange={handleSearchChange} />
     <Countries countries={countries} searchTerm={searchTerm} handleShowClick={handleShowClick}
     weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default App;
