const address = document.querySelector(".cityState");
const desc = document.querySelector(".description");
const tempDiv = document.querySelector(".temp");
const degree = document.querySelector(".degree");
const conditionsText = document.querySelector(".conditions");
const actualConditions = document.querySelector("#conditions");
const feelsLikeText = document.querySelector(".feelslike");
const actualFeelsLikeText = document.querySelector("#feelslike");
const humid = document.querySelector(".humidity");
const actualHumid = document.querySelector("#humidity");
const precipitation = document.querySelector(".precip");
const actualPrecipitation = document.querySelector("#precip");
const tempContainter = document.querySelector(".tempContainer");
const nextDays = document.querySelector(".days");
const nextDaysHeader = document.querySelector(".nextDaysText");

const resetInfo = () => {
  tempDiv.textContent = "";
  degree.textContent = "";
  conditionsText.textContent = "";
  actualConditions.textContent = "";
  feelsLikeText.textContent = "";
  actualFeelsLikeText.textContent = "";
  humid.textContent = "";
  actualHumid.textContent = "";
  precipitation.textContent = "";
  actualPrecipitation.textContent = "";
};

const addDescriptors = () => {
  degree.textContent = "° F";
  conditionsText.textContent = "Conditions: ";
  feelsLikeText.textContent = "Feels Like: ";
  humid.textContent = "Humidity: ";
  precipitation.textContent = "Precipitation: ";
};

export const updateLocationInfo = ({ resolvedAddress, description }) => {
  console.log(resolvedAddress);
  console.log(description);
  address.textContent = resolvedAddress;
  desc.textContent = description;
};

export const updateWeather = ({
  conditions,
  feelslike,
  humidity,
  precip,
  temp,
}) => {
  resetInfo();
  addDescriptors();
  tempDiv.textContent = temp;
  actualConditions.textContent = conditions;
  actualFeelsLikeText.textContent = feelslike;
  actualHumid.textContent = humidity;
  actualPrecipitation.textContent = precip;
  tempContainter.classList.add("border");
};

export const updateNextDays = (nextFiveDays) => {
  nextDays.innerHTML = "";
  nextDaysHeader.textContent = "";
  nextDaysHeader.textContent = "Next Five Days";
  for (let i = 1; i < 6; i++) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("dayCard");
    dayCard.id = "day" + i;

    const dayConditions = document.createElement("div");
    dayConditions.id = "day" + i + "Conditions";
    dayConditions.textContent = nextFiveDays[i]["conditions"];

    const dayTemp = document.createElement("div");
    dayTemp.id = "day" + i + "temp";
    dayTemp.textContent = nextFiveDays[i]["temp"] + "°";

    dayCard.append(dayConditions);
    dayCard.append(dayTemp);

    nextDays.append(dayCard);

    console.log(nextFiveDays[i]["temp"]);
  }
};
