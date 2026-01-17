import { useState } from "react";

const Country = ({ country }) => {
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
