import axios from "axios";

export const getWeatherForCity = async (city: string) => {
  console.log("lema11",city)
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0052724c46eaa7a20e12e875432f7b98`;
  const response = await axios.get(url);
  return response.data;
};