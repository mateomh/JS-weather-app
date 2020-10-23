async function getImage(type) {
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

  return realData.urls.raw;
}

getImage('cloudy');