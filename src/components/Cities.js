import { useState, useEffect, React } from 'react'
import Select from 'react-select'

const Cities = ({ setSelectedCity, setCoordinates, setWeatherData }) => {
  const [allCities, setAllCities] = useState([])
  const avoinDataURL = 'https://www.avoindata.fi/data/fi/api/3/action/datastore_search?resource_id=cb261c69-9883-486b-9e41-e0560471df86&'
  

  /**
   * Funktio hakee avoindata.fi sivulta tiedot suomen kunnista ja kaupungeista,
   * jonka jälkeen suodatetaan listaa siten, että jäljelle jää kaupungit 
   * ja niistä vain nimet
   */
  useEffect(() => {
    fetch(avoinDataURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result.records)
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
   * Funtio suoritetaan, kun käyttäjä valitsee kaupungin valikosta.
   * Lisätään kaupunki valituksi arvoon selectedCity.
   * Haetaan kaupungin kordinaatit geoCoding API:sta,
   * pyöristetään kahden desimaalin tarkkuuteen 
   * ja asetetaan ne uusiksi kordinaateiksi.
   * @param {string} selected 
   */
  const onSelect = (selected) => {
    const geoCodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${selected}`
    setSelectedCity(selected)
    console.log(selected)
    fetch(geoCodingURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        
        const longitude = data.results[0].longitude.toFixed(2)
        const latitude = data.results[0].latitude.toFixed(2)
        setCoordinates({
          longitude: longitude,
          latitude: latitude
        })

        let currentDate = new Date()
        let dayAfterTomorrow = new Date()
        dayAfterTomorrow.setDate(currentDate.getDate() + 2)
        dayAfterTomorrow = dayAfterTomorrow.toLocaleDateString('en-CA')
        currentDate = currentDate.toLocaleDateString('en-CA')
        console.log(dayAfterTomorrow)

        const weatherURL = 
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max&current_weather=true&timezone=Europe%2FMoscow&start_date=${currentDate}&end_date=${dayAfterTomorrow}`
    
        fetch(weatherURL)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
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
                weatherCode: data.daily.weathercode[2]
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
    <div>
      <Select options={allCities} 
        onChange={(valinta) => onSelect(valinta.value)} />
    </div>
  )
}

export default Cities