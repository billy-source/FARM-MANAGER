const WEATHER_API_KEY = '2e5d29af48a5c73d45c216f33813ddab'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather(city = 'New York') {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000,
        location: data.name,
        country: data.sys.country
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      
      return {
        temperature: 24,
        humidity: 65,
        windSpeed: 12,
        condition: 'Clear',
        description: 'clear sky',
        pressure: 1013,
        visibility: 10,
        location: 'Farm Location',
        country: 'US'
      };
    }
  },

  async getForecast(city = 'New York') {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data not available');
      }
      
      const data = await response.json();
      
      const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
      
      return dailyForecasts.map(item => ({
        date: new Date(item.dt * 1000).toISOString().split('T')[0],
        temperature: Math.round(item.main.temp),
        humidity: item.main.humidity,
        condition: item.weather[0].main,
        description: item.weather[0].description,
        precipitation: item.rain ? item.rain['3h'] || 0 : 0
      }));
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return [
        { date: '2024-01-25', temperature: 26, humidity: 60, condition: 'Sunny', description: 'clear sky', precipitation: 0 },
        { date: '2024-01-26', temperature: 23, humidity: 70, condition: 'Clouds', description: 'few clouds', precipitation: 0 },
        { date: '2024-01-27', temperature: 21, humidity: 80, condition: 'Rain', description: 'light rain', precipitation: 2.5 },
        { date: '2024-01-28', temperature: 25, humidity: 65, condition: 'Clear', description: 'clear sky', precipitation: 0 },
        { date: '2024-01-29', temperature: 27, humidity: 55, condition: 'Sunny', description: 'clear sky', precipitation: 0 }
      ];
    }
  }
};