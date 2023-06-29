import React, { useState, useEffect } from "react";
import {
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherSnow,
} from "react-icons/ti";

import { Form } from "./Form";
const Card = () => {
  const [isloading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("mumbai");
  const [humidity, setHumidity] = useState(0);
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [wind, setwind] = useState(0);
  const [temp, setTemp] = useState(0);

  const setWeathericon = (weather) => {
    if (weather === "clouds") setIcon(<TiWeatherCloudy />);
    else if (weather === "rain" || weather === "thunderstorm") {
      setIcon(<TiWeatherShower />);
    } else if (weather === "sunny") {
      setIcon(<TiWeatherSunny />);
    } else if (weather === "snow" || weather === "haze") {
      setIcon(<TiWeatherSnow />);
    } else {
      setIcon(<TiWeatherPartlySunny />);
    }
  };
  async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.cod == 200) {
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(data.main.temp_max);
      setwind(data.wind.speed);
      setHumidity(data.main.humidity);
      setWeather(data.weather[0].description);
      setWeathericon(data.weather[0].main.toLowerCase());
      setLoading(false);
    } else if (data.cod == 404) {
      setCity(undefined);
    }
  }

  useEffect(() => {
    const opurl = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=cdb4abce6537e91138658b5003647005`;
    getData(opurl);
  }, [search]);

  if (isloading) {
    return (
      <>
        <div className="body">
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="body" id="bg">
        <div className="container">
          <div className="temp-info">
            {city !== undefined ? (
              <>
                <h2>{`Weather in ${city} , ${country}`}</h2>
                <h2>{`${temp}${"\u00b0"}`}C</h2>
                <div id="icon">{icon} </div>
                <h4>{weather}</h4>
                <h4>{`Humidity : ${humidity}%`}</h4>
                <h4>{`Wind : ${wind} km/hr`}</h4>
              </>
            ) : (
              <h1>No such city exist</h1>
            )}
          </div>

          <Form setSearch={setSearch} />
        </div>
      </div>
    </>
  );
};

export default Card;






















