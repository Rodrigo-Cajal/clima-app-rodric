const apiKey = "ea489455df8e141859900fbca705b430";

const requestCity = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`
    );

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log("Error ", error);
  }
};
