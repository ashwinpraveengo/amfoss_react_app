import React, { useEffect, useState } from 'react';
import AddNote from './AddNote';
import './notes.css';
import Note from './Note';

const Notes = () => {
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);
  const [inputDate, setInputDate] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes/');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);
  
  const editHandler = (id, text, deadline) => {
    setEditToggle(id);
    setInputText(text);
    setInputDate(deadline);
  };

  const saveHandler = async () => {
    const data = {
        body: inputText,
        deadline: inputDate || null, 
    };

    const requestOptions = {
        method: editToggle ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const url = editToggle ? `/api/notes/${editToggle}/` : '/api/notes/';

    try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (editToggle) {
            setNotes(notes.map((note) => (note.id === editToggle ? { ...note, ...responseData } : note)));
        } else {
            setNotes((prevNotes) => [...prevNotes, responseData]);
        }

        setInputDate('');
        setInputText('');
        setEditToggle(null);
    } catch (error) {
        console.error('Error saving note:', error);
    }
};


const deleteHandler = async (id) => {
  console.log('Deleting note with ID:', id); 

  const url = `/api/notes/${id}/`;

  try {
      const response = await fetch(url, { method: 'DELETE' });

      if (response.status === 204) {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
          console.error('Error deleting note:', response.statusText);
      }
  } catch (error) {
      console.error('Error deleting note:', error);
  }
};

  return (
    <div className='notes'>
      {notes.map((note) =>
        editToggle === note.id ? 
          <AddNote
            key={note.id}
            id={note.id}
            inputText={inputText}
            setInputText={setInputText}
            inputDate={inputDate}
            setInputDate={setInputDate}
            saveHandler={saveHandler}
          />
         : 
          <Note
            key={note.id}
            id={note.id}
            text={note.body}
            deadline={note.deadline}
            editHandler={(id, text) => editHandler(id, text, note.deadline)}
            deleteHandler={deleteHandler}
          />
        )
      }
      {editToggle === null ? (
        <AddNote
          inputText={inputText}
          setInputText={setInputText}
          inputDate={inputDate}
          setInputDate={setInputDate}
          saveHandler={saveHandler}
          
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notes;
