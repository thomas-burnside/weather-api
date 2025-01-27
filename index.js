const apikey = "d1d409546a326f919e91ad8bc8dc26a1";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
        `Feels like:<br>${Math.round(data.main.feels_like)}°C`,
        `Humidity:<br>${data.main.humidity}%`,
        `Wind speed:<br>${data.wind.speed}m/s`
        ];
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");
        console.log(details);
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error happened, please try again later";
        weatherDataEl.querySelector(".details").innerHTML = "";
}
}