const search = document.querySelector(".search-box button");
const img = document.querySelector(".weather-box img");
const temp = document.querySelector(".weather-box .temperature");
const desp = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");

search.addEventListener("click", () => {
  const APIKey = "ff25534f64cec180f3cff986ed69f7e8";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        img.src = "images/wp404error.jpg";
        temp.innerHTML = ``;
        desp.innerHTML = `<span>City Not Found</span>`;
        humidity.innerHTML = ` --`;
        wind.innerHTML = ` --`;
        return;
      }

      switch (json.weather[0].main) {
        case "Clear":
          img.src = "images/clear.png";
          break;

        case "Rain":
          img.src = "images/rain.png";
          break;

        case "Snow":
          img.src = "images/snow.png";
          break;

        case "Clouds":
          img.src = "images/cloud.png";
          break;

        case "Haze":
          img.src = "images/haze.png";
          break;

        default:
          img.src = "";
      }

      temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      desp.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
