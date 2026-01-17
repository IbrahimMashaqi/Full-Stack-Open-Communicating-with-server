import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import SucsessNotification from "./components/SucessNotification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    personService.getPersons().then((data) => {
      setPersons(data);
      console.log(data);
    });
  }, []);

  const wait = (ms, setMessage) => {
    setTimeout(() => {
      setMessage(null);
    }, ms);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newPerson.name);
    const newObject = {
      name: newPerson.name,
      number: newPerson.number,
    };
    if (!person) {
      personService
        .addPerson(newObject)
        .then((data) => {
          setPersons(persons.concat(data));
          setSuccessMessage(`Added ${data.name}`);
          wait(5000, setSuccessMessage);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(`failed to add ${newObject.name}`);
          wait(5000, setErrorMessage);
        });
    } else if (
      !window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      setNewPerson({ name: "", number: "" });
      return;
    } else {
      personService
        .updatePerson(person.id, { ...person, number: newObject.number })
        .then((data) => {
          console.log(data);
          setPersons(
            persons.map((person) =>
              person.id === data.id
                ? { ...person, number: data.number }
                : person,
            ),
          );
          setSuccessMessage(`Updated ${data.name}`);
          wait(5000, setSuccessMessage);
        })
        .catch((error) => {
          if (error.response.status === 404)
            setErrorMessage(
              `Information of ${newObject.name} has already been removed from server`,
            );
          else setErrorMessage(`failed to update ${newObject.name}`);
          wait(5000, setErrorMessage);
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
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setSuccessMessage(`Deleted ${person.name}`);
        wait(5000, setSuccessMessage);
      })
      .catch((error) => {
        if (error.response.status === 404)
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`,
          );
        else setErrorMessage(`failed to delete ${person.name}`);
        wait(5000, setErrorMessage);
      });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <SucsessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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
