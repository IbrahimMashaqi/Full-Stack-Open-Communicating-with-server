import { useState } from "react";
import Person from "./components/Note";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 0, number: "0599999999" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newPerson.name);
    if (!found) {
      const newObject = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newObject));
    } else alert(`${newPerson.name} is already added to phonebook`);
    setNewPerson({ name: "", number: "" });
  };

  const handlePhoneChange = (event) => {
    setNewPerson({
      name: event.target.value,
      number: newPerson.number,
    });
  };
  const handleNumberChange = (event) => {
    setNewPerson({ name: newPerson.name, number: event.target.value });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const personsToShow = persons.filter(
    (person) =>
      person.name.toLocaleLowerCase().includes(filter) ||
      person.number.includes(filter)
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson.name} onChange={handlePhoneChange} />
        </div>
        <div>
          number:{" "}
          <input value={newPerson.number} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Person key={person.id} content={person}></Person>
        ))}
      </div>
    </div>
  );
};

export default App;
