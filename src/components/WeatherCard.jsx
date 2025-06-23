import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Gauge,
  MapPin
} from 'lucide-react';

const WeatherCard = ({ weather, forecast }) => {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case 'clouds':
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  const getConditionGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'from-yellow-400 via-orange-500 to-red-500';
      case 'clouds':
      case 'cloudy':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-blue-400 via-blue-500 to-blue-600';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  if (!weather) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Current Weather */}
      <div className={`bg-gradient-to-br ${getConditionGradient(weather.condition)} p-8 text-white`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-5 w-5" />
              <h3 className="text-xl font-bold">{weather.location}, {weather.country}</h3>
            </div>
            <p className="text-lg opacity-90 capitalize">{weather.description}</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
        
        <div className="text-5xl font-bold mb-6">
          {weather.temperature}°C
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5" />
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gauge className="h-5 w-5" />
            <span>Pressure: {weather.pressure} hPa</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Visibility: {weather.visibility} km</span>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="p-8">
          <h4 className="font-bold text-gray-900 text-xl mb-6">5-Day Forecast</h4>
          <div className="space-y-4">
            {forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{day.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">{day.temperature}°C</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Droplets className="h-3 w-3" />
                    <span>{day.humidity}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;