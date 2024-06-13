import React, { useState, useEffect } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {
    const fetchedCountry = async () => {
      if (name) {
        try {
          const response = await fetch(`${baseUrl}/${name}`)
          const data = await response.json()
          setCountry(data)
          console.log(data)
        } catch (error) {
          console.error(error)
      }
      }
    }
        fetchedCountry()
}, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.name) {
    return (
      <div>
        not found...
      </div>
    )
  }
  

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetchedCountry = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  //console.log(country)
  //console.log(name)

  return (
    <div>
      <form onSubmit={fetchedCountry}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App