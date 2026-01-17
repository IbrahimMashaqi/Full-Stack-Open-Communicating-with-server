const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    console.log(countries[0]);
    const languages = Object.values(countries[0].languages);
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>Capital {countries[0].capital}</p>
        <p>Area {countries[0].area}</p>
        <h1>Languages</h1>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
      </div>
    );
  }
  return (
    <div>
      {countries.map((country) => (
        <p key={country.cca3}>{country.name.common}</p>
      ))}
    </div>
  );
};

export default Countries;
