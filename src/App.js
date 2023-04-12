import './App.css';
import Searchbar from './Components/Searchbar';
import CurrentWeather from './Components/CurrentWeather';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_URL } from './api';

function App() {
  
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    const weatherFetch = fetch(`${OPEN_WEATHER_URL}weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`)
  }
  return (
    <div className="container">
      <Searchbar onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/>
    </div>
  );
}

export default App;
