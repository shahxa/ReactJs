import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [info, setInfo] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorPosition);
    }
    async function successCallback(position) {
      const API_KEY = "59c002570d4a8a9525afaa73c0c31742";
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();
        const [getCity] = data;
        console.log(getCity.name);
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${getCity.name}&appid=${API_KEY}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => setInfo(data));
      } catch (error) {
        console.log(error.message);
      }
    }
    function errorPosition(error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="container">
      <h2>Weather App</h2>

      <div className="display-weather-info">
        {info ? (
          <div>
            <p>City: {info.name}</p>
            <p>Temperature: {info.main.temp} °C</p>
            <p>wind degree: {info.wind.deg} °C</p>
            <p>wind speed: {info.wind.speed} °C</p>
            <p>Description: {info.weather[0].description}</p>
          </div>
        ) : (
          <p>No weather information available</p>
        )}
      </div>
    </div>
  );
};
export default App;
