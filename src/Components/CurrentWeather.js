import { ICON_URL } from "../api";
import weatherConditions from "../weather_conditions.json";

const CurrentWeather = ({ data }) => {
    const weatherDescriptionKey = data.weather[0].description.trim(' ');
    const weatherDescription = weatherConditions[weatherDescriptionKey];

    return (
        <div className="weatherdisplay">
            <div className="header">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="weather-desc">{weatherDescription}</p>
                </div>
                <p className="temp">{Math.round(data.main.temp)} °C</p>
            </div>
            <div className="bottom">
                <div>
                    <p className="tempspan">Hőérzet:</p>
                    <p className="feelslike">{Math.round(data.main.feels_like)} °C</p>
                    <p className="windspam">Szél</p>
                    <p className="wind">{Math.round(data.wind.speed)}  m/s</p>
                </div>
                <div>
                    <img alt="weather" className="weather-icon" src={ICON_URL + data.weather[0].icon + '.png'} />
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;