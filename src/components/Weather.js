/* eslint-disable no-unused-vars */
import {React, useEffect, useState } from 'react'
import Switch from 'react-switch'
import WeatherInfo from './WeatherInfo.js'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * 
 * @param {city} string 
 * @param {coordinates} Object 
 * @param {weatherData} Object 
 * @returns weather info.
 * If "Show weather of next 3 days" is selected, shows weather of the next 3 days.
 */
const Weather = ({city,  coordinates, weatherData, handleResetChoice}) => {
  const [threeDaysView, setThreeDayView] = useState(false)
  
 
  console.log(weatherData)
  return (
    <div>
      <div className='location_info_div'>
        <h2 className='city_header'>{city}</h2>
        <label className='coordinates'>{coordinates.latitude}°N {coordinates.longitude}°E</label>
      </div>

      {threeDaysView ?
        //Maps through weatherData object keys, to get data from all 3 dates.
        Object.keys(weatherData).map((weatherOtd, i) => 
          <WeatherInfo
            key={weatherData[weatherOtd].date}
            weatherCode={weatherData[weatherOtd].weathercode}
            temperature={weatherData[weatherOtd].temperature}
            date={weatherData[weatherOtd].date}
          />
        )
        :
        //Shows weather for current date. 
        <WeatherInfo 
          weatherCode={weatherData.currentDay.weathercode}
          temperature={weatherData.currentDay.temperature}
          date={weatherData.currentDay.date}/>
            
      }

      <div className='slider_div'>
        <label>
          <span>Show weather of next 3 days</span>
          <Switch onChange={()=>setThreeDayView(!threeDaysView)} checked={threeDaysView} className="switch_slider" />
        </label>
      </div>
      <div>
        <Button
          type="button" 
          className="btn btn-secondary" 
          as='a' 
          variant='light'
          onClick={handleResetChoice}
        >Choose city
        </Button>
      </div>
    </div>
  )
  

  

}

export default Weather