import React, {useEffect, useState} from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("/api/notes/");
    const data = await response.json();
    setNotes(data);
  };
  return (
      <div className="notes">
          <div className="notes-header">
                  <h2 className="notes-title">&#9782;</h2>
                <h3>Notes</h3>
              <p className="notes-count">{notes.length}</p>
          </div>
        <div className="notes-list">
          {notes.map((note, index) => (
           <ListItem key={index} note={note}/>
          ))}
        </div>
          <AddButton/>
      </div>
  )
};

export default NotesListPage;
