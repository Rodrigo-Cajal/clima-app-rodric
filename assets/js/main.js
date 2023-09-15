const form = document.getElementById("form");
const cityInput = document.querySelector(".search-input");
const cardContainer = document.querySelector(".card-container");
const searchTitle = document.querySelector(".search-title");
const errorMessage = document.getElementById("error-message");

const roundNumber = (number) => Math.round(number);

const isEmptyInput = () => {
  return cityInput.value.trim() === "";
};

const isInvalidCity = (cityData) => {
  return !cityData.id;
};

const getCityData = (cityData) => {
  return {
    cityName: cityData.name,
    imageName: cityData.weather[0].icon,
    cityWeatherInfo: cityData.weather[0].description,
    cityTemp: roundNumber(cityData.main.temp),
    cityST: roundNumber(cityData.main.feels_like),
    cityMaxTemp: roundNumber(cityData.main.temp_max),
    cityMinTemp: roundNumber(cityData.main.temp_min),
    cityHumidity: cityData.main.humidity,
  };
};

const createCityTemplate = (cityData) => {
  const {
    cityName,
    imageName,
    cityWeatherInfo,
    cityTemp,
    cityST,
    cityMaxTemp,
    cityMinTemp,
    cityHumidity,
  } = getCityData(cityData);

  return `
  <div class="weather-card animate">
    <div class="weather-info-container">
            <h2 class="weather-title">${cityName}</h2>
            <p class="weather-description">${cityWeatherInfo}</p>
            <div class="weather-temp-container">
              <span class="weather-temp">${cityTemp}°</span>
              <span class="weather-st">${cityST}° ST</span>
            </div>
          </div>
          <div class="weather-img-container">
          <img src="./assets/img/${imageName}.png" alt="weather image"/>
          </div>
          <div class="weather-extra-container">
            <div class="weather-minmax-container">
              <span class="weather-span"
                ><i class="fa-solid fa-arrow-up-long"></i>Max: ${cityMaxTemp}º</span
              >
              <span class="weather-span"
                ><i class="fa-solid fa-arrow-down-long"></i>Min: ${cityMinTemp}º</span>
       </div>
     <span class="weather-humidity">${cityHumidity}% Humedad</span>
  </div>
  </div>
  `;
};

const renderCityCard = (cityData) => {
  cardContainer.innerHTML = createCityTemplate(cityData);
};

const changeSearchTitle = (cityData) => {
  const cityName = cityData.name;
  searchTitle.innerHTML = `Así esta el clima en ${cityName}!`;
};

const searchCity = async (e) => {
  e.preventDefault();

  if (isEmptyInput()) {
    errorMessage.textContent = "Por favor ingrese una ciudad";
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2500);
    return;
  }

  const fetchedCity = await requestCity(cityInput.value);

  if (isInvalidCity(fetchedCity)) {
    errorMessage.textContent = "La ciudad ingresada no existe";
    errorMessage.style.display = "block";
    form.reset();
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2500);
    return;
  }

  errorMessage.style.display = "none";

  renderCityCard(fetchedCity);
  changeSearchTitle(fetchedCity);
  form.reset();
  return;
};

const init = () => {
  form.addEventListener("submit", searchCity);
};

init();
