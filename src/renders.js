function clearInfo(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

export function renderWeatherInfo(data) {
  const infoDiv = document.getElementById('forecast-info');
  const units = document.getElementById('temp-units');

  const dataBoard = document.createElement('div');
  const title = document.createElement('h2');
  const info = document.createElement('ul');
  const keys = ['max_temp', 'min_temp', 'humidity'];

  clearInfo(infoDiv);
  dataBoard.classList.add('data-board');
  title.innerText = data.weather;
  for (let i = 0; i < keys.length; i += 1) {
    const item = document.createElement('li');
    item.innerText = `${keys[i]}: ${data[keys[i]]}`;
    if (i < 2) {
      item.innerText += ` °${units.value}`;
    } else {
      item.innerText += '%';
    }
    info.appendChild(item);
  }

  dataBoard.append(title, info);
  infoDiv.appendChild(dataBoard);
}

export function renderCityInfo(data) {
  const city = document.getElementById('city');
  const coord = document.getElementById('coord');
  const temp = document.getElementById('main-temp');
  const weather = document.getElementById('weather');
  const units = document.getElementById('temp-units');

  city.innerText = data.city;
  coord.innerText = `(LAT: ${data.lat} °N, LON: ${data.lon} °W)`;
  temp.innerText = `Temperature: ${data.temp} °${units.value}`;
  weather.innerText = data.weather_desc;
}

export function renderBackgrounds(city, weather) {
  const cityDiv = document.getElementById('general-info');
  const weathDiv = document.getElementById('forecast-info');

  cityDiv.style.backgroundImage = `url(${city})`;
  weathDiv.style.backgroundImage = `url(${weather})`;
}