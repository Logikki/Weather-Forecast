import {React, useState} from 'react'
import CitySelection from './components/CitySelection.js'
import Weather from './components/Weather.js'

const App = () => {

  const [selectedCity, setSelectedCity] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  /**
   * Fcuntion resets all values.
   */
  const handleResetChoice = () => {
    setWeatherData(null)
    setCoordinates(null)
    setSelectedCity(null)
  }
  /**
   * Renders citySelection view when city is not selected.
   * City is not selected if weatherData is null.
   */

  return (
    <div className="app_wrapper">
      {weatherData===null ?
        <div>
          <CitySelection 
            setSelectedCity={setSelectedCity}  
            setCoordinates={setCoordinates}
            setWeatherData={setWeatherData}
            coordinates={coordinates}
          />
          
        </div>
        :
        <div className='weather_wrapper'> 
          <Weather 
            city={selectedCity} 
            coordinates={coordinates}
            weatherData={weatherData}
            handleResetChoice={handleResetChoice}
          />
        </div>

      }
    </div>
  )
}


export default App
