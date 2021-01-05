import React, {useState} from "react" ;

const api = {
  key :  "5ff65f5881c24e67413390618f0377b4",
  base : "https://api.openweathermap.org/data/2.5/" ,
}

function App() {

  const [query , setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` // template string ashiglaj baina.
  }

  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 15) 
    ? 'app warm' 
    : 'app') 
    : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Хотын нэрийг бичнэ үү..."
          onChange= {e => setQuery(e.target.value)}
          value = {query}
          onKeyPress= {search}
          />
        </div>
        <div className="container">
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          ) : ('')}
        </div>
      </main>
    </div>
  );
}

export default App;
