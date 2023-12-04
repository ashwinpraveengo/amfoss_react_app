import React, { useEffect } from 'react';
import './notes.css';

const Note = ({id, text, deadline, editHandler, deleteHandler}) => {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const isDeadlinePassed = deadlineDate < currentDate;

  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const daysDifference = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    console.log('Text:', text);
    console.log('Deadline:', deadline);
  }, [text, deadline]);
  

  return (
    <div className={`note ${isDeadlinePassed ? 'note-deadline-passed' : ''}`}>
        <div className='note-body'>{text}</div>
        <div className='note_footer'  style={{justifyContent : "flex-end"}}>
        <button className='note_save'  onClick={() => deleteHandler(id)}>&#10060; </button>
        <button className='note_save' style={{ marginLeft: '10px' }}  onClick={() => editHandler(id, text)}>Edit</button>
        <p> </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '10px' }}>{`Deadline: ${formattedDeadline}`}</p>
        {isDeadlinePassed ? (
          <p style={{ margin: 0, fontSize: '12px' }}></p>
        ) : (
          <p style={{ margin: 0 }}>{`Days left: ${daysDifference}`}</p>
        )}
      </div>
      </div>
        
    </div>
    
  )
}

export default Note