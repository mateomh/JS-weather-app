function parseWeatherData(data) {
  return {
    city: data.name,
    temp: data.main.temp,
    weather: data.weather[0].main,
    weather_desc: data.weather[0].description,
  };
}

async function getWeatherInfo(city) {
  const key = 'acb20f9ff5d6a288ecb4800af4426da3';
  let weatherApiURL = 'https://api.openweathermap.org/data/2.5/weather';

  weatherApiURL += `?q=${city}`;
  weatherApiURL += `&appid=${key}`;

  const response = await fetch(weatherApiURL);
  const rawData = await response.json();
  return parseWeatherData(rawData);
}

getWeatherInfo('bogota');