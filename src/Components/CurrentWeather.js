const CurrentWeather = () => {
    return (
        <div className="weatherdisplay">
            <div className="header">
                <p className="city">Győr</p>
                <p className="temp">18°C</p>
            </div>
            <div>
                <p className="weather-desc">Sunny</p>
                <img alt="weather" className="weather-icon" src="http://openweathermap.org/img/w/10d.png"/>
            </div>
            <div>
                <span>Szél</span>
                <span>10 m/s</span>
            </div>
        </div>
    );
}

export default CurrentWeather;