/* eslint-disable arrow-body-style, camelcase */

import * as Render from './renders';

function parseWeatherData(data) {
  const {
    name: city,
    main: {
      temp,
      temp_min: min_temp,
      temp_max: max_temp,
      humidity,
    },
    coord: { lat, long },
    weather: [weatherObj],
  } = data;

  const { main: weather, description: weather_desc } = weatherObj;

  const obj = {
    city,
    temp,
    min_temp,
    max_temp,
    humidity,
    lat,
    long,
    weather,
    weather_desc,
  };
  return obj;
}

function convertTemps(data) {
  const units = document.getElementById('temp-units');
  switch (units.value) {
    case 'C':
      data.temp = Math.round(data.temp - 273.15);
      data.max_temp = Math.round(data.max_temp - 273.15);
      data.min_temp = Math.round(data.min_temp - 273.15);
      break;
    case 'F':
      data.temp = Math.round((data.temp * (9 / 5)) - 459.67);
      data.max_temp = Math.round((data.max_temp * (9 / 5)) - 459.67);
      data.min_temp = Math.round((data.min_temp * (9 / 5)) - 459.67);
      break;
    default:
      break;
  }

  return data;
}

function noCityInfo() {
  return {
    city: 'No city found',
    temp: 0,
    weather: '404 error',
    weather_desc: 'No city found',
    min_temp: 0,
    max_temp: 0,
    humidity: 0,
    lat: 0,
    lon: 0,
  };
}

function defaultImage(city) {
  if (city === 'city') {
    return 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
  }
  return 'https://images.unsplash.com/flagged/photo-1576045771676-7ac070c1ce72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
}

export async function getWeatherInfo(city) {
  const key = 'acb20f9ff5d6a288ecb4800af4426da3';
  let weatherApiURL = 'https://api.openweathermap.org/data/2.5/weather';

  weatherApiURL += `?q=${city}`;
  weatherApiURL += `&appid=${key}`;

  const response = await fetch(weatherApiURL);
  const rawData = await response.json();

  return parseWeatherData(rawData);
}

export async function getImage(type) {
  let unsplashApiURL = 'https://api.unsplash.com/photos/random';
  const clientID = 'yzaA27Bnm-RKqmb9ud2qC1imujfvoCREjcqG23C4ca0';
  const orientation = 'landscape';
  const count = 1;
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Accept-Version': 'v1',
    },
  };

  unsplashApiURL += `?orientation=${orientation}`;
  unsplashApiURL += `&count=${count}`;
  unsplashApiURL += `&client_id=${clientID}`;
  unsplashApiURL += `&query=${type}`;

  const response = await fetch(unsplashApiURL, fetchOptions);
  const [realData] = await response.json();
  return realData.urls.regular;
}

export async function getCityName() {
  const name = document.getElementById('city-name');
  let data;
  if (name.value === '') {
    name.classList.add('warning');
  } else {
    name.classList.remove('warning');
    data = await getWeatherInfo(name.value.toLowerCase()).catch(noCityInfo);
    data = convertTemps(data);
    Render.renderCityInfo(data);
    Render.renderWeatherInfo(data);
    let cityimg = '';
    let weatherimg = '';
    if (data.weather === '404 error') {
      cityimg = 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80';
      weatherimg = 'https://images.unsplash.com/photo-1559144098-968b3904ca68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80';
    } else {
      cityimg = await getImage(`${name.value.toLowerCase()} city`).catch(() => { return defaultImage('city'); });
      weatherimg = await getImage(data.weather).catch(() => { return defaultImage('weather'); });
    }

    Render.renderBackgrounds(cityimg, weatherimg);
  }
}