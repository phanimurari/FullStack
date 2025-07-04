// WeatherApp.js
import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  // State management using useState hooks
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');
  const [searchCity, setSearchCity] = useState('');

  // Fetch weather data function
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🌤️ Fetching weather for ${cityName}...`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated weather data (In real app, use actual API)
      const mockWeatherData = {
        name: cityName,
        main: {
          temp: Math.floor(Math.random() * 35) + 5, // Random temp between 5-40°C
          feels_like: Math.floor(Math.random() * 35) + 5,
          humidity: Math.floor(Math.random() * 100),
          pressure: Math.floor(Math.random() * 100) + 1000
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
            description: ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'light snow'][Math.floor(Math.random() * 6)],
            icon: '02d'
          }
        ],
        wind: {
          speed: Math.floor(Math.random() * 20) + 1
        },
        sys: {
          country: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES'][Math.floor(Math.random() * 8)]
        }
      };
      
      setWeather(mockWeatherData);
      console.log('✅ Weather data fetched successfully:', mockWeatherData);
      
    } catch (err) {
      console.error('❌ Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Effect 1: Fetch weather when city changes
  useEffect(() => {
    console.log('🌍 Weather Effect: City changed, fetching weather...');
    console.log('   - Triggered by city state change');
    console.log('   - Current city:', city);
    console.log('   - Equivalent to componentDidUpdate for city changes');
    
    fetchWeather(city);
  }, [city]); // Dependency array - runs when city changes

  // Effect 2: Update document title when weather changes
  useEffect(() => {
    console.log('📄 Document Title Effect: Weather data changed');
    
    if (weather) {
      const title = `Weather: ${weather.name} - ${weather.main.temp}°C`;
      document.title = title;
      console.log('   - Document title updated to:', title);
    }
    
    // Cleanup function to reset title
    return () => {
      document.title = 'React App';
      console.log('   - Document title reset to default');
    };
  }, [weather]); // Runs when weather data changes

  // Effect 3: Log component mount and unmount
  useEffect(() => {
    console.log('🏠 Weather App: Component mounted');
    console.log('   - Weather app is ready');
    console.log('   - This runs only once on mount');
    
    return () => {
      console.log('🏠 Weather App: Component unmounting');
      console.log('   - Cleanup any ongoing operations');
    };
  }, []); // Empty dependency array - runs once on mount

  // Handle city search
  const handleCitySearch = () => {
    if (searchCity.trim()) {
      console.log('🔍 Searching for city:', searchCity.trim());
      setCity(searchCity.trim());
      setSearchCity('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
  };

  const renderWeatherView  = () => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {weather.name}
                {weather.sys?.country && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({weather.sys.country})
                  </span>
                )}
              </h3>
              <p className="text-gray-600 capitalize text-lg">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-yellow-600">
                {weather.main.temp}°C
              </p>
              <p className="text-sm text-gray-500">
                Feels like {weather.main.feels_like}°C
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-lg font-semibold">{weather.main.humidity}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pressure</p>
              <p className="text-lg font-semibold">{weather.main.pressure} hPa</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Condition</p>
              <p className="text-lg font-semibold">{weather.weather[0].main}</p>
            </div>
          </div>
        </div>
      )
  }

  const renderLoadingView= () => {
    return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-yellow-700">Loading weather data...</p>
          <p className="text-sm text-yellow-600">useEffect is fetching data...</p>
        </div>
      )
  }

  return (
    <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">
        Weather Application - useState & useEffect Demo
      </h2>
      
      {/* Search Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name"
            className="flex-1 px-3 py-2 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-purple-800"
          />
          <button
            onClick={handleCitySearch}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>


      {/* Conditional Rendering */}
      {/* Loading State */}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Weather Display */}
      { loading ? renderLoadingView() : renderWeatherView()}
      
      {/* Explanation Section */}
      <div className="mt-6 text-sm text-yellow-700 bg-yellow-100 p-4 rounded">
        <h3 className="font-bold mb-2">useState & useEffect Implementation:</h3>
        <div className="space-y-2">
          <div>
            <strong>useState Hooks:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• <code>weather</code> - Stores API response data</li>
              <li>• <code>loading</code> - Manages loading state</li>
              <li>• <code>error</code> - Handles error messages</li>
              <li>• <code>city</code> - Current city for weather</li>
              <li>• <code>searchCity</code> - Search input value</li>
            </ul>
          </div>
        
        </div>
      </div>
      
    </div>
  );
};

export default WeatherApp;