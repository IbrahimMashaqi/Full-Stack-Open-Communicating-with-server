import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_KEY;
  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: country.capital[0],
          appid: api_key,
          units: "metric",
        },
      })
      .then((response) => {
        console.log(response);
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <h3>Temperature: {weather?.main.temp}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
      />
      <h3>Wind {weather?.wind.speed} m/s</h3>
    </div>
  );
};
const Countries = ({ countries }) => {
  const [selectedCountry, setCountry] = useState(null);
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    console.log(countries[0]);
    return <Country country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button
            onClick={() => {
              setCountry(country);
            }}
          >
            show
          </button>
          {selectedCountry?.cca3 === country.cca3 && (
            <Country country={country} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Countries;
