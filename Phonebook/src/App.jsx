import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 0, number: "0599999999" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  useEffect(() => {
    personService.getPersons().then((data) => {
      setPersons(data);
      console.log(data);
    });
  }, []);
  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newPerson.name);
    const newObject = {
      name: newPerson.name,
      number: newPerson.number,
    };
    if (!person) {
      personService.addPerson(newObject).then((data) => {
        setPersons(persons.concat(data));
      });
    } else if (
      !window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`,
      )
    )
      return;
    else {
      personService.updatePerson(newObject, person.id).then((data) => {
        console.log(data);
        setPersons(
          persons.map((person) =>
            person.id === data.id ? { ...person, number: data.number } : person,
          ),
        );
      });
    }
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
      person.number.includes(filter),
  );
  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${person.name} ?`)) return;
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };
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
      <Persons handleButton={handleDelete} persons={personsToShow} />
    </div>
  );
};

export default App;
