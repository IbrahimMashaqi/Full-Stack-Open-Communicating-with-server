const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((sum, part) => (sum += part.exercises), 0);
  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <h3>Total of {total} exercises</h3>
    </div>
  );
};
const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
