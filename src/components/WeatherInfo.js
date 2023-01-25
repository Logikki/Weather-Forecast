/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun,faWater, faCloudRain, faCloudSunRain, faSun, faCloudBolt,faSnowflake, faCloud  } from '@fortawesome/free-solid-svg-icons'

const WeatherInfo = ({weatherCode, temperature, date }) => {
  const [faIcon, setFaIcon] = useState({})

  useEffect(() => {
    console.log(weatherCode)
    if(weatherCode === 0) {
      setFaIcon(faSun)
    }
    else if ([1,2].includes(weatherCode)) {
      setFaIcon(faCloudSun)
    }
    else if ([3].includes(weatherCode)) {
      setFaIcon(faCloud)
    }
    else if ([45, 48].includes(weatherCode)) {
      setFaIcon(faWater)
    }
    else if ([51, 53, 55, 56, 57].includes(weatherCode))
      setFaIcon(faCloudSunRain)
    else if ([61,63,65,66,67].includes(weatherCode)) {
      setFaIcon(faCloudRain)
    }
    else if ([71, 73, 75, 77, 80, 81, 82, 85, 86].includes(weatherCode)) {
      setFaIcon(faSnowflake)
    
    }
    else if ([95,96,99].includes(weatherCode)) {
      setFaIcon(faCloudBolt)
    }
    else {
      setFaIcon(faCloudSun)
    }
  },[])

  return (
    <FontAwesomeIcon icon={faIcon} size='6x'/>
  )
    

  
}

export default WeatherInfo