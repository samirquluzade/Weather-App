import { useState } from "react";
import clear from "./4511741.png";
import cloud from "./clouds+cloudy+weather+icon-1320196635828207342.png";

const API = {
  key: "e934e6ad3bbebe9353af66052bbef46a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setquery] = useState("");
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then(res => res.json())
        .then(data => {
          setWeather(data);
          setquery("");
          console.log(weather);
        });
    }
  };
  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  const getWeather = data => {
    if (data === "Clouds") {
      return <img src={cloud} alt="clouds" className="image" />;
    }
    if (data === "Clear") {
      return <img src={clear} alt="clear" className="image" />;
    }
  };
  return (
    <div className="app">
      <main className="container">
        <div className="search-input">
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            onChange={e => setquery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                {getWeather(weather.weather[0].main)}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
//clouds,clear

export default App;
