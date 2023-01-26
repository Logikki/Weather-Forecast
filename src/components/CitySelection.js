import { useState, useEffect, React } from 'react'
import Select from 'react-select'

/**
 *  
 * @returns City selection view
 */
const CitySelection = ({ setSelectedCity, setCoordinates, setWeatherData }) => {
  const [allCities, setAllCities] = useState([])
  const avoinDataURL = 'https://www.avoindata.fi/data/fi/api/3/action/datastore_search?resource_id=cb261c69-9883-486b-9e41-e0560471df86&'
  

  /**
   * useEffect Function fetches list of finnish cities and municipalities from "avoindata.fi".
   * Then reduces the data to consist of cities only.
   * Sets the list of cities to {allCities}
   */
  useEffect(() => {
    fetch(avoinDataURL)
      .then((res) => res.json())
      .then((data) => {
        const reduced = data.result.records.reduce((filtered, option)=> {
          if (option.KUNTAMUOTO === 'Kaupunki') {
            const city = {value: option.KUNTANIMIFI, label: option.KUNTANIMIFI}
            filtered.push(city)
          }
          return filtered
        },[])

        setAllCities(reduced)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  
  /**
   * Function is run when user selects a city from the selector
   * City is set to value {selectedCity}.
   * Searches city coordinates from geoCoding API and round to float .2 
   * Then Weather data is searched from current date to day after tomorrow.
   * Weather data is set to {newWeatherData} for further usage. 
   * @param {string} selected 
   */
  const onSelect = (selected) => {
    const geoCodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${selected}`
    setSelectedCity(selected)
    fetch(geoCodingURL)
      .then((res) => res.json())
      .then((data) => {      
        const longitude = data.results[0].longitude.toFixed(2)
        const latitude = data.results[0].latitude.toFixed(2)
        setCoordinates({
          longitude: longitude,
          latitude: latitude
        })
        //Dates to make API request to get weather data from this day to day after tomorrow
        let currentDate = new Date()
        let dayAfterTomorrow = new Date()
        dayAfterTomorrow.setDate(currentDate.getDate() + 2)
        dayAfterTomorrow = dayAfterTomorrow.toLocaleDateString('en-CA')
        currentDate = currentDate.toLocaleDateString('en-CA')

        const weatherURL = 
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max&current_weather=true&timezone=Europe%2FMoscow&start_date=${currentDate}&end_date=${dayAfterTomorrow}`
    
        fetch(weatherURL)
          .then((res) => res.json())
          .then((data) => {
            const newWeatherData = 
            {
              currentDay: {
                date : data.daily.time[0],
                temperature: data.current_weather.temperature,
                weathercode: data.current_weather.weathercode
              },
              nextDay: {
                date : data.daily.time[1],
                temperature: data.daily.temperature_2m_max[1],
                weathercode: data.daily.weathercode[1]
              },
              datDay: {
                date : data.daily.time[2],
                temperature: data.daily.temperature_2m_max[2],
                weathercode: data.daily.weathercode[2]
              }
            }
            setWeatherData(newWeatherData)
          }
          )
          .catch((err) => {
            console.log(err.message)
          })
      })
  }

  return (
    <div className='select_city_div'>
      <Select 
        placeholder='Select city'
        options={allCities} 
        onChange={(valinta) => onSelect(valinta.value)} 
        className='city_select'
      />
    </div>
  )
}

export default CitySelection