import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

interface Coordinates {
  lat: number;
  lon: number;
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 0, lon: 0 });
  const apiKey = 'd3375065792398d6e40325dbffa33d9b';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  const fetchData = async () => {
    try {
      const response = await axios.get<WeatherData>(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coordinates]);

  return (
    <div>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          step="0.0001"
          placeholder="Enter latitude"
          value={coordinates.lat}
          onChange={(e) => setCoordinates({ ...coordinates, lat: parseFloat(e.target.value) })}
          style={{ color: 'black' }}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          step="0.0001"
          placeholder="Enter longitude"
          value={coordinates.lon}
          onChange={(e) => setCoordinates({ ...coordinates, lon: parseFloat(e.target.value) })}
          style={{ color: 'black' }}
        />
      </div>

      {weatherData && (
        <div>
          <h2>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;