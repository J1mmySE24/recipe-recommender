import React, { useState } from 'react';

const Calendar = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ title: '', date: '', time: '', notes: '' });

  // Function to add a new session
  const handleAddSession = () => {
    if (newSession.title && newSession.date && newSession.time) {
      setSessions([...sessions, { ...newSession, id: Date.now() }]);
      setNewSession({ title: '', date: '', time: '', notes: '' });
    }
  };

  // Function to delete a session
  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Schedule a New Gym Session</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Session Title"
          value={newSession.title}
          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          value={newSession.date}
          onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
          style={styles.input}
        />
        <input
          type="time"
          value={newSession.time}
          onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Notes"
          value={newSession.notes}
          onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
          style={styles.textarea}
        />
        <button onClick={handleAddSession} style={styles.button}>Add Session</button>
      </div>

      <h2 style={styles.subHeader}>Scheduled Sessions</h2>
      <ul style={styles.list}>
        {sessions.map(session => (
          <li key={session.id} style={styles.listItem}>
            <strong>{session.title}</strong><br />
            Date: {session.date}<br />
            Time: {session.time}<br />
            Notes: {session.notes}<br />
            <button onClick={() => handleDeleteSession(session.id)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    backgroundColor: '#f9f9f9'
  },
  header: {
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer'
  },
  buttonHover: {
    backgroundColor: '#218838'
  },
  subHeader: {
    textAlign: 'center',
    color: '#333'
  },
  list: {
    listStyleType: 'none',
    padding: '0'
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc'
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Calendar;