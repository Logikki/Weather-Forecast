/* eslint-disable no-unused-vars */
import {React, useState} from 'react'
import Cities from './components/Cities.js'
import Weather from './components/Weather.js'




const App = () => {

  const [selectedCity, setSelectedCity] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  /**
   * Renderöidään kaupungin valinta, jos kordinaatteja ei ole.
   * Jos kordinaatit, eli kaupunki on asetettu, näytetään Weather komponentti.
   */
  const handleResetChoice = () => {
    setWeatherData(null)
    setCoordinates(null)
    setSelectedCity(null)
  }

  return (
    <div className="app_wrapper">
      <h1>The weather service</h1>
      {weatherData===null ?
        <div>
          <Cities 
            setSelectedCity={setSelectedCity}  
            setCoordinates={setCoordinates}
            setWeatherData={setWeatherData}
          />
          
        </div>
        :
        <Weather 
          city={selectedCity} 
          coordinates={coordinates}
          weatherData={weatherData}
          handleResetChoice={handleResetChoice}
        />

      }
    </div>
  )
}


export default App
