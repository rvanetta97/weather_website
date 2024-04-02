const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#form')

function handleWeatherOutput(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=301263d2318cc1692e32070fb90f7a59`)
        .then(response => response.json())
        .then(data => {
            console.log(data.list);
            printResults(data.list);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function printResults(weatherData) {

    const today = new Date().toLocaleDateString(); // Get today's date in string format

    weatherData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString();
        //five days forcast
        if (dateString !== today && item.dt_txt.includes("12:00")) { // Filter out data for today
            console.log(item.dt_txt.includes("12:00"))
            const forecastItem = document.createElement('div');
            forecastItem.id = "one-day"

            const dateEl = document.createElement('p');
            dateEl.textContent = dateString;

            const temperatureEl = document.createElement('p');
            temperatureEl.textContent = `Temperature: ${item.main.temp} °F`;

            const windEl = document.createElement('p');
            windEl.textContent = `Wind: ${item.wind.speed} MPH`;

            const humidityEl = document.createElement('p');
            humidityEl.textContent = `Humidity: ${item.main.humidity} %`;

            const fivedays = document.querySelector('#five-days')
            forecastItem.append(dateEl, temperatureEl, windEl, humidityEl);
            fivedays.appendChild(forecastItem);
        }
        //today's forcast
        else if(dateString == today){
            const cityName = document.querySelector('#search-input').value;

            const todayWeather = document.createElement("div")
            todayWeather.id = "result-today"

            const currentDateEl = document.createElement('p');
            currentDateEl.textContent = dateString;

            const currentTemperatureEl = document.createElement('p');
            currentTemperatureEl.textContent = `Temperature: ${item.main.temp} °F`;
            
            const currentWindEl = document.createElement('p');
            currentWindEl.textContent = `Wind: ${item.wind.speed} MPH`;

            const currenthumidityEl = document.createElement('p');
            currenthumidityEl.textContent = `Humidity: ${item.main.humidity} %`;

            const resulttoday = document.querySelector('#result-today')
            resulttoday.append(cityName, currentDateEl, currentTemperatureEl, currentWindEl, currenthumidityEl);
        }
    });

    //cityNames.forEach(item => {
       //const searchedCities = document.createElement("div")
       //searchedCities.id = "cities"
       //cities = document.querySelector('cities')
      // cities.append(searchedCities)

       // localStorage.setItem('cities', citiesName);
   // });
}

form.addEventListener('submit', function (event) {
    console.log("submit")
    event.preventDefault ();
    var cityName = document.querySelector('#search-input').value;
    console.log(cityName)

    //cityNames.push(cityName);
    //localStorage.setItem('cityNames', cityNames);

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=301263d2318cc1692e32070fb90f7a59`)
        .then(response => response.json())
        .then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(data)
            console.log(`Lat: ${lat}, Lon: ${lon}`);
            handleWeatherOutput(lat, lon)
        })
        .catch(error => console.error('Error fetching location data:', error));
});
