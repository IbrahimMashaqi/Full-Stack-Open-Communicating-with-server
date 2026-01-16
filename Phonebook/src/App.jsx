import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const personsToShow = persons.filter(
    (person) =>
      person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      person.number.includes(filter)
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        handleInputChange={handleInputChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
