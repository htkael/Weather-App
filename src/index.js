import "./styles.css";
import { updateLocationInfo, updateNextDays, updateWeather } from "./ui";

// get weather data from API
const fetchData = async (inp) => {
  let url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    inp +
    "/?key=6GMG6G9YJAYMC2CHW2S8TPBMS";
  try {
    const fetchedData = await fetch(url, { mode: "cors" });
    if (!fetchedData.ok) {
      throw new Error("Network response was not ok");
    }
    return await fetchedData.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
};

// Filter data for what we need
const processData = async (inp) => {
  const data = await fetchData(inp);

  if (!data) {
    console.log("Error @ getWeatherData", data);
    return null;
  }

  const { resolvedAddress, description } = data;
  const locationInfo = { resolvedAddress, description };

  const weatherKeys = [
    "datetime",
    "conditions",
    "temp",
    "precip",
    "feelslike",
    "humidity",
  ];

  const curr = data.currentConditions;
  const currentWeather = weatherKeys.reduce((acc, key) => {
    if (key in curr) {
      acc[key] = curr[key];
    }
    return acc;
  }, {});

  const nextFiveDays = {};
  const days = data.days;
  for (let i = 1; i <= 5; i++) {
    let d = days[i];
    const dayData = weatherKeys.reduce((acc, key) => {
      if (key in d) {
        acc[key] = d[key];
      }
      return acc;
    }, {});
    nextFiveDays[i] = dayData;
  }

  return { locationInfo, currentWeather, nextFiveDays };
};

// Function to add input from user form to fetchData request
const getLocation = async () => {
  const input = document.querySelector("#search");
  const location = input.value;
  return processData(location);
};

// add Event Listener to form to log location and weather info
const addSearchListener = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const weatherInfo = await getLocation();
    console.log(weatherInfo);
    updateLocationInfo(weatherInfo.locationInfo);
    updateWeather(weatherInfo.currentWeather);
    updateNextDays(weatherInfo.nextFiveDays);
  });
};

addSearchListener();
