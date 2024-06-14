import { useEffect, useState } from 'react'
import './Weather.css'

function Weather() {
    let [city, setCity] = useState({});
    let [icon, setIcon] = useState("");
    let [cityName, setCityName] = useState("");

    useEffect(() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=e8988573483b036cc946ddde037c0de6", {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCity(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    function handleInputChange(event) {
        setCityName(event.target.value);
    }

    function handleSubmit() {
        event.preventDefault();
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e8988573483b036cc946ddde037c0de6", {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCity(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (city.weather && city.weather.length > 0) {
            setIcon("https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png")
        }
    }, [city]);

    return (
        <div className='card_container'>
            <div className='card'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter city' className='inp' onChange={handleInputChange} required></input>
                        <button type='submit' className='btn'>Search</button>
                    </form>
                </div>
                <div>
                    {city.main && <h1>{Math.round((city.main.temp) - 273.15) + " °C"}</h1>}
                    <h1>{city.name}</h1>
                </div>
                <img src={icon} alt="Weather icon" className='image' />
                <div>
                    {city.main && <h1>{"Humidity: " + (city.main.humidity) + " % "}</h1>}
                    {city.main && <h1>{"Wind: " + (city.wind.speed) + " m/s "}</h1>}
                </div>
            </div>
        </div>
    )
}

export default Weather
