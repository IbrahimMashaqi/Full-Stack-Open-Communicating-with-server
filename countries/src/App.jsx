import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Countries from "./components/Countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  useEffect(() => {
    countriesService.getCountries().then((data) => {
      setAllCountries(data);
    });
  }, []);
  const filterCuntries = (event) => {
    const filteredCountries = allCountries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    );

    setCountries(filteredCountries);
  };

  return (
    <div>
      <span>Find countries</span>
      <input type="text" onChange={filterCuntries} />

      <Countries countries={countries} />
    </div>
  );
};

export default App;
