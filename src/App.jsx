import "./App.css";
import uparrow from "./assets/uparrow.png";
import dowarrow from "./assets/downarrow.png";

import cloudy from "./assets/cloudy.png";
import rain from "./assets/rain.png";
import haze from "./assets/haze.png";
import fog from "./assets/fog.png";
import mist from "./assets/mist.png";
import wind from "./assets/windy.png";
import clear from "./assets/clear.png";
import drizzle from "./assets/drizzle.png";
import dust from "./assets/dust.png";
import sand from "./assets/sand.png";
import snow from "./assets/snow.png";
import smoke from "./assets/smoke.png";
import squall from "./assets/squall.png";
import strom from "./assets/strom.png";
import tornado from "./assets/tornado.png";

import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

function App() {
  const [toast, setToast] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [weatherData, setWeatherData] = useState({
    main: {
      temp: 273,
      feels_like: 273,
      temp_min: 273,
      temp_max: 273,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    weather: [{ description: "partly cloudy" }],
    wind: { speed: 0 },
    name: "City Name",
    timezone: 0,
  });

  // Define the state for weather icon
const [weatherIcon, setWeatherIcon] = useState(clear);

// Fetch weather data and update icon based on API response
const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59fe6f8350cda8bdb8b5bec4e8abbcd5`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    setWeatherData(data);

    // Update weather icon based on main weather condition from the response data
    const IconChange = data.weather[0].main;
    console.log(IconChange);

    switch (IconChange) {
      case "Clouds":
        setWeatherIcon(cloudy);
        break;
      case "Rain":
        setWeatherIcon(rain);
        break;
      case "Wind":
        setWeatherIcon(wind);
        break;
      case "Clear":
        setWeatherIcon(clear);
        break;
      case "Drizzle":
        setWeatherIcon(drizzle);
        break;
      case "Dust":
        setWeatherIcon(dust);
        break;
      case "Fog":
        setWeatherIcon(fog);
        break;
      case "Haze":
        setWeatherIcon(haze);
        break;
      case "Mist":
        setWeatherIcon(mist);
        break;
      case "Sand":
        setWeatherIcon(sand);
        break;
      case "Smoke":
        setWeatherIcon(smoke);
        break;
      case "Snow":
        setWeatherIcon(snow);
        break;
      case "Squall":
        setWeatherIcon(squall);
        break;
      case "Thunderstorm":
        setWeatherIcon(strom);
        break;
      case "Tornado":
        setWeatherIcon(tornado);
        break;
      default:
        setWeatherIcon(clear);
    }
  } else {
    setToast(true)
  }
};


  // Function to convert timezone offset to local time
  const getLocalTime = (offset) => {
    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + offset * 1000);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = localTime.toLocaleTimeString("en-US", options);
    const dayString = localTime.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return `${dayString}, ${timeString}`;
  };
  // Function to format date as "25-December-2024"
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };

  // Get current date
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const localTime = weatherData ? getLocalTime(weatherData.timezone) : "";

  const sunrise =
    weatherData.sys?.sunrise &&
    new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const sunset =
    weatherData.sys?.sunset &&
    new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bgDiv">
        <div
          style={{ height: "550px", width: "1025px" }}
          className="rounded m-5 d-flex justify-content-center align-items-center media"
        >
          <div
            style={{
              backgroundColor: "#F4F4F4",
              width: "350px",
              height: "100%",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
            className="d-flex flex-column align-items-center searchDiv"
          >
            <div
              style={{
                width: "220px",
                height: "30px",
                backgroundColor: "#cbcbcc",
                borderRadius: "15px",
              }}
              className="d-flex align-items-center justify-content-center mt-5 "
            >
              <input
                onChange={(e) => setUserInput(e.target.value)}
                style={{ width: "160px" }}
                type="text"
                placeholder=" Search City"
                className="text-dark"
              />
              <i
                onClick={() => fetchWeather(userInput)}
                className="fa-solid fa-magnifying-glass text-center ms-2"
              ></i>
            </div>
            {/* Toast message */}
      <Toast className="toast" onClose={() => setToast(false)} show={toast} delay={5000} autohide>
          <Toast.Header>
           
            <strong className="me-auto">OpenWeather</strong>
          </Toast.Header>
          <Toast.Body>Please Enter City Name Correctly!</Toast.Body>
        </Toast>


            <img
              id="icon"
              src={weatherIcon}
              alt="no image"
              className="climateIcon mb-4"
            />

            {weatherData && (
              <>
                <p className="degree">
                  {Math.round(weatherData.main.temp - 273.15)}
                  <span className="symbol">°</span>C
                </p>
                <p>{weatherData.weather[0].description}</p>
                <hr className="mb-4" />
                <p className="date">{formattedDate}</p>
                <p
                  style={{ marginTop: "-10px", fontSize: "15px" }}
                  className="day"
                >
                  {localTime}
                </p>
                <p className="mt-5">{weatherData.name}</p>
              </>
            )}
          </div>
          <div className="gridBg">
            <p style={{ marginLeft: "55px" }} className="mt-5">
              Today
            </p>
            {/* grid Elements */}
            {weatherData && (
              <>
                <div className="grid mt-2">
                  <div className="gridElement">
                    <p className="insideGridtext">wind</p>
                    <p className="digit">{weatherData.wind.speed} km/h</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Humidity</p>
                    <p className="digit">{weatherData.main.humidity}%</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Real Feels</p>
                    <p className="digit">
                      {Math.round(weatherData.main.feels_like - 273.15)}°c
                    </p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Pressure</p>
                    <p className="digit">{weatherData.main.pressure} mb</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Sea Level</p>
                    <p className="digit">{weatherData.main.sea_level}</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Ground Level</p>
                    <p className="digit">{weatherData.main.grnd_level}</p>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext tempHead">Temp History</p>
                    <div className="d-flex">
                      <img
                        className="up"
                        style={{ height: "15px" }}
                        src={uparrow}
                        alt=""
                      />
                      <p className="digit">
                        {Math.round(weatherData.main.temp_min - 273.15)}°c
                      </p>
                    </div>
                    <div className="d-flex">
                      <img
                        className="down"
                        style={{ height: "15px" }}
                        src={dowarrow}
                        alt=""
                      />
                      <p className="digit">
                        {Math.round(weatherData.main.temp_max - 273.15)}°c
                      </p>
                    </div>
                  </div>

                  <div className="gridElement">
                    <p className="insideGridtext">Sun</p>
                    <div className="d-flex">
                      <p className="insideGridtext1 rise">Rise</p>
                      <p className="digit">{sunrise || "0:00 Am"}</p>
                    </div>
                    <div className="d-flex">
                      <p className="insideGridtext1 set">Set</p>
                      <p className="digit">{sunset || "0:00 Pm"}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <p className="cmpny">
              All Data Provided by{" "}
              <span className="cmpnyname">Open Weather</span>
            </p>
          </div>
        </div>
      </div>




      
    </>
  );
}

export default App;
