const BASE_PATH = "../assets";

export const weatherOptions = [
  { day: true, condition: "clear", url: new URL(`${BASE_PATH}/day/sunny.png`, import.meta.url), color: "rgba(255, 230, 0, 1)" },
  { day: false, condition: "clear", url: new URL(`${BASE_PATH}/night/clear.png`, import.meta.url), color: "rgba(0, 0, 128, 1)" },

  { day: true, condition: "clouds", url: new URL(`${BASE_PATH}/day/cloudy.png`, import.meta.url), color: "rgba(135, 206, 250, 1)" },
  { day: false, condition: "clouds", url: new URL(`${BASE_PATH}/night/cloudy-night.png`, import.meta.url), color: "rgba(75, 75, 75, 1)" },

  { day: true, condition: "rain", url: new URL(`${BASE_PATH}/day/rain.png`, import.meta.url), color: "rgba(30, 144, 255, 1)" },
  { day: false, condition: "rain", url: new URL(`${BASE_PATH}/night/rain-night.png`, import.meta.url), color: "rgba(0, 0, 255, 1)" },

  { day: true, condition: "thunderstorm", url: new URL(`${BASE_PATH}/day/storm.png`, import.meta.url), color: "rgba(128, 0, 128, 1)" },
  { day: false, condition: "thunderstorm", url: new URL(`${BASE_PATH}/night/storm-night.png`, import.meta.url), color: "rgba(75, 0, 130, 1)" },

  { day: true, condition: "snow", url: new URL(`${BASE_PATH}/day/snow.png`, import.meta.url), color: "rgba(240, 248, 255, 1)" },
  { day: false, condition: "snow", url: new URL(`${BASE_PATH}/night/snow-night.png`, import.meta.url), color: "rgba(211, 211, 211, 1)" }
];





export const API_KEY = "609a2068c9818f6f35269aa1f2affaf5";

export const DEFAULT_COORDINATES = {
  latitude: "40.7128", // Example: New York City
  longitude: "-74.0060",
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png",
  },
];





