import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    // Fetch all notes from the backend
    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Add a new note
    const addNote = async () => {
        if (!title || !content) {
            alert('Both title and content are required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/notes', { title, content });
            setNotes([...notes, response.data]);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    // Update an existing note
    const updateNote = async (id) => {
        if (!title || !content) {
            alert('Both title and content are required');
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/notes/${id}`, { title, content });
            setNotes(notes.map(note => note._id === id ? response.data : note));
            setEditingNote(null);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div>
            <h1>Notes App</h1>
            {/* Form to input title and content */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ display: 'block', marginBottom: '10px', width: '300px', padding: '8px' }}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ display: 'block', marginBottom: '10px', width: '300px', height: '100px', padding: '8px' }}
                />
                {editingNote ? (
                    <button onClick={() => updateNote(editingNote._id)}>Update Note</button>
                ) : (
                    <button onClick={addNote}>Add Note</button>
                )}
            </div>

            {/* Display the list of notes */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {notes.map(note => (
                    <li key={note._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <button onClick={() => {
                            setTitle(note.title);
                            setContent(note.content);
                            setEditingNote(note);
                        }}>Edit</button>
                        <button onClick={() => deleteNote(note._id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NoteApp;
