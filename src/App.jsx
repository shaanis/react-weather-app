import "./App.css";
import sunClimate from "./assets/weather.svg";
import uparrow from "./assets/uparrow.png";
import dowarrow from "./assets/downarrow.png";
import { useState, useEffect } from "react";

function App() {
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
  const fetchWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59fe6f8350cda8bdb8b5bec4e8abbcd5`
    );
    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } else {
      alert("please check again..!!!");
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
      <div
        className="d-flex justify-content-center align-items-center bgDiv"
      >
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
                width: "200px",
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
                className="fa-solid fa-magnifying-glass text-center"
              ></i>
            </div>
            <img src={sunClimate} alt="no image" className="climateIcon mb-4" />
            {weatherData && (
              <>
                <p className="degree">
                  {Math.round(weatherData.main.temp - 273.15)}
                  <span className="symbol">°</span>C
                </p>
                <p>{weatherData.weather[0].description}</p>
                <hr className="mb-4" />
                <p className="date">{formattedDate || "-- -- ----"}</p>
                <p
                  style={{ marginTop: "-10px", fontSize: "15px" }}
                  className="day"
                >
                  {localTime || "-- : -- --"}
                </p>
                <p className="mt-5">{weatherData.name}</p>
              </>
            )}
          </div>
          <div className="gridBg"
          
          >
            <p style={{ marginLeft: "55px" }} className="mt-4">
              Today
            </p>
            {/* grid Elements */}
            {weatherData && (
              <>
                <div className="grid mt-2">
                  <div
                    
                    className="gridElement"
                  >
                    <p className="insideGridtext">wind</p>
                    <p className="digit">{weatherData.wind.speed} km/h</p>
                  </div>

                  <div
                    
                    className="gridElement"
                  >
                    <p className="insideGridtext">Humidity</p>
                    <p className="digit">{weatherData.main.humidity}%</p>
                  </div>

                  <div
                    
                    className="gridElement"
                  >
                    <p className="insideGridtext">Real Feels</p>
                    <p className="digit">
                      {Math.round(weatherData.main.feels_like - 273.15)}°c
                    </p>
                  </div>

                  <div
                    
                    className="gridElement"
                  >
                    <p className="insideGridtext">Pressure</p>
                    <p className="digit">{weatherData.main.pressure} mb</p>
                  </div>

                  <div
                    
                    className="gridElement"
                  >
                    <p className="insideGridtext">Sea Level</p>
                    <p className="digit">{weatherData.main.sea_level}</p>
                  </div>

                  <div
                    
                    className="gridElement"
                  >
                    <p className="insideGridtext">Ground Level</p>
                    <p className="digit">{weatherData.main.grnd_level}</p>
                  </div>

                  <div
                   
                    className="gridElement"
                  >
                    <p className="insideGridtext tempHead">Temp History</p>
                    <div className="d-flex">
                      <img style={{ height: "15px" }} src={uparrow} alt="" />
                      <p className="digit">
                        {Math.round(weatherData.main.temp_min - 273.15)}°c
                      </p>
                    </div>
                    <div className="d-flex">
                      <img style={{ height: "15px" }} src={dowarrow} alt="" />
                      <p className="digit">
                        {Math.round(weatherData.main.temp_max - 273.15)}°c
                      </p>
                    </div>
                  </div>

                  <div
                   
                    className="gridElement"
                  >
                    <p className="insideGridtext">Sun</p>
                    <div className="d-flex">
                      <p className="insideGridtext1">Rise</p>
                      <p className="digit">{sunrise || "0:00 Am"}</p>
                    </div>
                    <div className="d-flex">
                      <p className="insideGridtext1">Set</p>
                      <p className="digit">{sunset || "0:00 Am"}</p>
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
