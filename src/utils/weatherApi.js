export const API_KEY = "609a2068c9818f6f35269aa1f2affaf5";

export const getWeatherData = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();

    console.log("Fetched Weather Condition:", data.weather[0].main.toLowerCase());

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      type: defineWeatherType(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
      isDay: isDayTime(data.sys.sunrise, data.sys.sunset)
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { type: "", temperature: null, city: "", condition: "", isDay: true };
  }
};

export const defineWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

// Determine if it's daytime or nighttime
export const isDayTime = (sunrise, sunset) => {
  const now = Math.floor(Date.now() / 1000);
  return now > sunrise && now < sunset;
};
