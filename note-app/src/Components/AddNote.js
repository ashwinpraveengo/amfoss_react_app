import React from 'react'
import './notes.css';


const AddNote = ({inputText, setInputText, saveHandler, inputDate, setInputDate}) => {
    const char= 100;
    const charLimit = char - inputText.length;
  return (
    <div className='note'>
        <textarea
        cols={10}
        rows={5}
        placeholder='Type your note here.....'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={char}
        >
        </textarea>
       
        <div className='note_footer'>
            <span className='label'>{charLimit} Left</span>
            <input
            type='date'
            value={inputDate}
            className='note_save'
            style={{ marginLeft: '10px', display: 'inline-flex' }}
            placeholder='Enter the date '
            onChange={(e) => setInputDate(e.target.value)}
            />
            <button className='note_save' style={{ marginLeft: '10px' }} onClick={saveHandler}>SAVE</button>
        </div>
    </div>
  )
}

export default AddNote