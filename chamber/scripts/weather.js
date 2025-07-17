const API_KEY = "0f8f9e16acb9105767df681f5497c674";  
const lat = -19.453140;  
const lon = 29.815359;  

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

async function getWeather() {
  try {
    // ✅ Fetch Current Weather
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherURL),
      fetch(forecastURL)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    // ✅ Update Current Weather
    document.getElementById("location").textContent = currentData.name || "Gweru";
    document.getElementById("temp").textContent = `${Math.round(currentData.main.temp)} °C`;
    document.getElementById("description").textContent = currentData.weather[0].description;
    document.getElementById("humidity").textContent = currentData.main.humidity;

    const weatherIcon = document.getElementById("icon");
    const iconCode = currentData.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.srcset = `
      https://openweathermap.org/img/wn/${iconCode}.png 1x, 
      https://openweathermap.org/img/wn/${iconCode}@2x.png 2x
    `;

    // ✅ 3-Day Forecast
    const dailyForecast = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastHTML = dailyForecast.slice(0, 3).map(day => {
      const date = new Date(day.dt * 1000).toDateString();
      const icon = day.weather[0].icon;
      return `
        <div class="forecast-day">
          <h4>${date}</h4>
          <img 
            src="https://openweathermap.org/img/wn/${icon}@2x.png" 
            srcset="
              https://openweathermap.org/img/wn/${icon}.png 1x, 
              https://openweathermap.org/img/wn/${icon}@2x.png 2x
            "
            alt="${day.weather[0].description}" 
            width="80" height="80" loading="lazy">
          <p><b>${Math.round(day.main.temp)} °C</b></p>
          <p>${day.weather[0].description}</p>
        </div>
      `;
    }).join("");

    document.getElementById("forecast-container").innerHTML = forecastHTML;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
