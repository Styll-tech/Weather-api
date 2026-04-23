const apiKey = "902bd21f1739dc8ff2e9eaf8a4a51508";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weather = document.getElementById("weather");
  const loader = document.getElementById("loader");
  const card = document.getElementById("weatherCard");

  if (!city) return;

  card.style.display = "block";
  weather.innerHTML = "";
  loader.style.display = "block";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
  )
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";

      if (data.cod !== 200) {
        weather.innerHTML = "<p>City not found ❌</p>";
        return;
      }

      weather.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(() => {
      loader.style.display = "none";
      weather.innerHTML = "<p>Something went wrong ❌</p>";
    });
}
