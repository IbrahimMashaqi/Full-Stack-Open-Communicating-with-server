const Note = ({ content }) => {
  return (
    <li>
      {content.name} {content.number}
    </li>
  );
};

export default Note;
