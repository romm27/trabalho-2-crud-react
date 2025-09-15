import { useState, useEffect } from 'react';
import './App.css';
import DataList from './DataList';

function App() {
  const [replays, setReplays] = useState([]);
  const [editingReplay, setEditingReplay] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8800';

  const getReplays = () => {
    fetch(`${API_URL}/`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch replays.');
        return response.json();
      })
      .then(data => setReplays(data))
      .catch(error => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  };

  useEffect(() => { getReplays(); }, []);

  const handleEdit = (replay) => {
    setError(null);
    setEditingReplay(replay);
    setModalIsOpen(true);
  };

  const handleAdd = () => {
    setError(null);
    setEditingReplay(null);
    setSelectedFile(null);
    setModalIsOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this replay?")) {
      setError(null);
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete replay.');
          const newReplays = replays.filter((replay) => replay.id !== id);
          setReplays(newReplays);
        })
        .catch(error => {
            console.error("Delete error:", error);
            setError(error.message);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;

    if (editingReplay) {
      const updatedReplay = {
        title: form.title.value,
        description: form.description.value,
        uploaderName: form.uploaderName.value,
      };
      fetch(`${API_URL}/${editingReplay.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReplay),
      })
      .then(response => { if (!response.ok) throw new Error('Failed to update replay.'); return response.json(); })
      .then(() => {
        getReplays();
        setModalIsOpen(false);
        setEditingReplay(null);
      })
      .catch(err => setError(err.message));
    } else {
      if (!selectedFile) {
        setError("Please select a replay file to upload.");
        return;
      }
      const formData = new FormData();
      formData.append('title', form.title.value);
      formData.append('description', form.description.value);
      formData.append('uploaderName', form.uploaderName.value);
      formData.append('replayFile', selectedFile);

      fetch(`${API_URL}/`, { method: 'POST', body: formData })
      .then(response => { if (!response.ok) throw new Error('Failed to upload replay.'); return response.json(); })
      .then(() => {
        getReplays();
        setModalIsOpen(false);
      })
      .catch(err => setError(err.message));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Company of Heroes 2 Replay Hub</h1>
        <button className="btn-add" onClick={handleAdd}>Upload New Replay</button>
      </header>
      
      {error && <div className="error-message">{error}</div>}

      <DataList replays={replays} handleEdit={handleEdit} handleDelete={handleDelete} />

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingReplay ? 'Edit Replay' : 'Upload New Replay'}</h2>
            <form onSubmit={handleSubmit}>
              <input name="title" placeholder="Title" defaultValue={editingReplay?.title || ''} required />
              <input name="uploaderName" placeholder="Your Name" defaultValue={editingReplay?.uploaderName || editingReplay?.uploader_name || ''} required />
              <textarea name="description" placeholder="Description (optional)" defaultValue={editingReplay?.description || ''} />
              
              {!editingReplay && (
                <input type="file" name="replayFile" accept=".rec" onChange={(e) => setSelectedFile(e.target.files[0])} required />
              )}
              
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="app-footer">
        Giovanni Strasser
      </footer>
    </div>
  );
}

export default App;
