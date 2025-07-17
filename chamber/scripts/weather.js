const API_KEY = "0f8f9e16acb9105767df681f5497c674";  // Replace with your OpenWeather API key
const lat = -19.453140;  // Gweru latitude
const lon = 29.815359;   // Gweru longitude

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

async function getWeather() {
  try {
    /** --- ✅ CURRENT WEATHER --- **/
    const responseCurrent = await fetch(currentWeatherURL);
    const currentData = await responseCurrent.json();
    console.log("Current Weather:", currentData);

    document.getElementById("location").textContent = currentData.name || "Gweru";
    document.getElementById("temp").textContent = `${currentData.main.temp} °C`;
    document.getElementById("description").textContent = currentData.weather[0].description;
    document.getElementById("humidity").textContent = currentData.main.humidity;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

    /** --- ✅ 3-DAY FORECAST --- **/
    const responseForecast = await fetch(forecastURL);
    const forecastData = await responseForecast.json();
    console.log("Forecast:", forecastData);

    const dailyForecast = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    let forecastHTML = "";

    dailyForecast.slice(0, 3).forEach(day => {
      const date = new Date(day.dt * 1000).toDateString();
      const temp = day.main.temp;
      const description = day.weather[0].description;
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

      forecastHTML += `
        <div class="forecast-day">
          <h4>${date}</h4>
          <img src="${icon}" alt="${description}">
          <p><b>${temp} °C</b></p>
          <p>${description}</p>
        </div>
      `;
    });

    document.getElementById("forecast-container").innerHTML = forecastHTML;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Run when page loads
getWeather();
