const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <h3 key={person.id}>
          {person.name} {person.number}
        </h3>
      ))}
    </div>
  );
};

export default Persons;
