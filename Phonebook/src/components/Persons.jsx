const Persons = ({ persons, handleButton }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                handleButton(person.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
