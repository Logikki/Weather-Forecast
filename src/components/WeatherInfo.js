/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun,faWater, faCloudRain, faCloudSunRain, faSun, faCloudBolt,faSnowflake, faCloud  } from '@fortawesome/free-solid-svg-icons'
import fontawesome from '@fortawesome/fontawesome'
fontawesome.library.add(faCloudSun,faWater, faCloudRain, faCloudSunRain, faSun, faCloudBolt,faSnowflake, faCloud)

/**
 * 
 * @param {weathercode} Int 
 * @param {temperature} Double 
 * @param {date} Date 
 * @returns Weather info box 
 */
const WeatherInfo = ({weatherCode, temperature, date }) => {

  const [faIcon, setFaIcon] = useState('cloud')
  const [weatherDescription, setweatherDescription] = useState('-')
  /**
   * UseEffect chooces most suitable icon for given weather code according to  
   * WMO Weather interpretation codes (WW).
   */
  useEffect(() => {
    if(weatherCode === 0) {
      setFaIcon('sun')
      setweatherDescription('Clear sky')
    }
    else if ([1,2].includes(weatherCode)) {
      setFaIcon('cloud-sun')
      setweatherDescription('Mainly clear')
    }
    else if ([3].includes(weatherCode)) {
      setFaIcon('cloud')
      setweatherDescription('Cloudy')
    }
    else if ([45, 48].includes(weatherCode)) {
      setFaIcon('water')
      setweatherDescription('Fog')
    }
    else if ([51, 53, 55, 56, 57].includes(weatherCode)) {
      setFaIcon('cloud-sun-rain')
      setweatherDescription('Drizzle')
    }
    else if ([61,63,65,66,67].includes(weatherCode)) {
      setFaIcon('cloud-rain')
      setweatherDescription('Rain')
    }
    else if ([71, 73, 75, 77, 80, 81, 82, 85, 86].includes(weatherCode)) {
      setFaIcon('Snow')
    
    }
    else if ([95,96,99].includes(weatherCode)) {
      setFaIcon('cloud-bolt')
      setweatherDescription('Tunderstorm')
    }
  },[])

  return (
    <div className='weather_info'>
      <h6>{date}</h6>
      <FontAwesomeIcon icon={faIcon} size='7x'/>
      <h6 className='weather_description'>{weatherDescription}</h6>
      <h2 className='temperature_header'> °C {temperature}</h2>
    </div>
  )
}

export default WeatherInfo