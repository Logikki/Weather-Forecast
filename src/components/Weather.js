import {React, useState } from 'react'
import Switch from 'react-switch'
import WeatherInfo from './WeatherInfo.js'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * 
 * @param {city} string 
 * @param {coordinates} Object 
 * @param {weatherData} Object 
 * @param {handleResetChoice} Function
 * @returns weather info view.
 * If "Show weather of next 3 days" is selected, shows weather info of the next 3 days.
 * Otherwise shows weather info for current date
 * 
 * Button handles going back to city selection view
 */
const Weather = ({city,  coordinates, weatherData, handleResetChoice}) => {
  const [threeDaysView, setThreeDayView] = useState(false)

  return (
    <div>
      <div className='location_info_div'>
        <h2 className='city_header'>{city} </h2>
        <label className='coordinates'>{coordinates.latitude}°N {coordinates.longitude}°E </label>
      </div>

      {threeDaysView ?
        //Maps through weatherData object keys, to get data from all 3 dates.
        Object.keys(weatherData).map((weatherOtd) => 
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
          date={weatherData.currentDay.date} />
      }

      <div className='slider_div'>
        <label>
          <Switch onChange={()=>setThreeDayView(!threeDaysView)} checked={threeDaysView} className="switch_slider" />
          <p className='slider-text'>Show 1 / 3 days</p>
        </label>
      </div>
      <div> 
        
        <Button 
          type="button" 
          className="chooce-city-button" 
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