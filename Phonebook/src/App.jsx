import { useState } from "react";
import Person from "./components/Note";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");
  const addPhone = (event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newObject));
  };

  const handlePhoneChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhone}>
        <div>
          name: <input value={newName} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person key={person.id} note={person}></Person>
        ))}
      </div>
    </div>
  );
};

export default App;
