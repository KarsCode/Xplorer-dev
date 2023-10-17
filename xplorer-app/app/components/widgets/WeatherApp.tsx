'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@prisma/client';

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

interface WeatherAppProps{
  currentUser:  User 

}

const WeatherApp: React.FC<WeatherAppProps> = ({
  currentUser
}) => {
  const latitude= currentUser.latitude!;
  const  longitude= currentUser.longitude!;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: latitude, lon: longitude });
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
    <div className="text-white p-2 overflow-x-auto hidden md:block">
  {weatherData && (
    <div className="text-center">
      <h2 className="text-xm md:text-base">
        Weather in {weatherData.name}, {weatherData.sys.country}
      </h2>
      <p className="text-xm md:text-base">
        Temp: {weatherData.main.temp}°C
      </p>
      <p className="text-xm md:text-base">
        Conditions: {weatherData.weather[0].description}
      </p>
    </div>
  )}
</div>

  );
};

export default WeatherApp;