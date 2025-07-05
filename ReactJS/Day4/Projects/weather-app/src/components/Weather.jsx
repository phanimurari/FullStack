import { useState, useEffect } from 'react';

const Weather = () => {
  // Local state for the city input
  const [city, setCity] = useState('');

  // The city that triggers the weather fetch
  const [query, setQuery] = useState('Chennai');

  // Holds the weather data returned from API
  const [weather, setWeather] = useState(null);

  // Loading and error status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API constants
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page refresh
    if (city.trim()) {
      setQuery(city); // Update query to trigger useEffect
      setCity(''); // Clear input
    }
  };

  // Fetch weather data whenever `query` changes
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Start loading state
      setError(''); // Reset error

      try {
        // Build URL with query parameters
        const url = `${BASE_URL}?q=${query}&units=metric&appid=${API_KEY}`;

        // Fetch weather from API
        const response = await fetch(url);
        
        // If not successful, throw error
        if (!response.ok) throw new Error('City not found');

        // Parse JSON data
        const data = await response.json();
        setWeather(data); // Save data to state
      } catch (err) {
        setError(err.message); // Handle errors
        setWeather(null); // Clear old data
      } finally {
        setLoading(false); // End loading
      }
    };

    if (query) fetchWeather(); // Run only if query is not empty
  }, [query]);

  // Component render
  return (
    <div className="weather-container">
      <h1>Weather App 🌤️</h1>

      {/* Form to search city */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {/* Loading & Error States */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Weather Display */}
      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="weather-main">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
