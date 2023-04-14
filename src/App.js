import './App.css';
import Searchbar from './Components/Searchbar';
import CurrentWeather from './Components/CurrentWeather';
import Forecast from './Components/Forecast'
import {useState} from 'react';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_URL } from './api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    const forecastFetch = fetch(`${OPEN_WEATHER_URL}forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
    const weatherFetch = fetch(`${OPEN_WEATHER_URL}weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
  
    Promise.all([weatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
    <div className='main-header'>
      <h1>Weather App</h1>
    </div>
    <div className="container">
      <Searchbar onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/> }
    </div>
    </div>
  );
}

export default App;
