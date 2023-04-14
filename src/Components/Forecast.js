import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ICON_URL } from "../api";
import weatherConditions from "../weather_conditions.json";


const Forecast = ({ data }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const weather = [{}];

    data.list.map((item,index) => {
        if(index > 0){
            const weatherDescriptionKey = item.weather[0].description.trim(' ');
            const weatherDescription = weatherConditions[weatherDescriptionKey];
            const sortDate = item.dt_txt.slice(5, 16);
        weather.push({ date: sortDate, '°C': Math.round(item.main.temp), temp: Math.round(item.main.temp), icon: item.weather[0].icon, desc: weatherDescription });
    }    })

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{label}</p>
                    <p className="label">{payload[0].value + " °C"}</p>
                    <img alt="weather" className="weather-icon" src={ICON_URL + payload[0].payload.icon + '.png'} />
                </div>
            );
        }

        return null;
    };

    if (windowWidth >= 955) {
        return (
            <div>
                <h2>5 napos előrejelzés:</h2>
                <div className='chart'>
                    <LineChart width={800} height={400} data={weather} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="°C" stroke="#ffffff" activeDot={{ r: 8 }} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </div>
                <table>
                    <tbody>
                        {weather.map((item, index) => (
                            (item.date !== undefined) ? (
                                <tr key={index} >
                                    <td>{item.date}</td>
                                    <td>{item.temp} °C</td>
                                    <td>{item.desc}</td>
                                    <td className="table-icon"><img alt="weather" className="weather-icon" src={ICON_URL + item.icon + '.png'} /></td>
                                </tr>
                            ) : null
                        ))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <table>
                <tbody>
                    {weather.map((item, index) => (
                        (item.date !== undefined) ? (
                            <tr key={index} >
                                <td>{item.date}</td>
                                <td>{item.temp} °C</td>
                                <td>{item.desc}</td>
                                <td className="table-icon"><img alt="weather" className="weather-icon" src={ICON_URL + item.icon + '.png'} /></td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>
        )
    }

}

export default Forecast;