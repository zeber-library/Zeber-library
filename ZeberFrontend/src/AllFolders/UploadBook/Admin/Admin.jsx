import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import './Admin.css'; // Import the normal CSS file

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    description: '',
    genre: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/admin')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/admin/${id}`)
      .then(() => {
        setData(prevData => prevData.filter(item => item._id !== id));
      })
      .catch(err => setError(err.message));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      author: item.author,
      description: item.description,
      genre: item.genre,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/admin/${editingItem._id}`, formData)
      .then(response => {
        setData(prevData => prevData.map(item => item._id === editingItem._id ? response.data : item));
        setEditingItem(null);
      })
      .catch(err => setError(err.message));
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="admin-container">
      {data.map(item => (
        <div key={item._id} className="card">
          {item.imageFilePath ? (
            <>
              <img src={`${item.imageFilePath}`} alt={item.name} className="card-image" />
            </>
          ) : (
            <div className="no-image">
              <p>No Cover Image</p>
            </div>
          )}
          <div className="card-content">
            <h2 className="card-title">{item.name}</h2>
            <p className="card-author">Author: {item.author}</p>
            <p className="card-description">{item.description}</p>
            <p className="card-genre">Genre: {item.genre}</p>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                <FaEdit /> <span>Edit</span>
              </button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingItem && (
        <div className="edit-modal">
          <div className="edit-form">
            <h2>Edit Book</h2>
            <input
              type="text"
              className="input-field"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={handleUpdate}>
                <FaSave /> <span>Save</span>
              </button>
              <button className="cancel-btn" onClick={() => setEditingItem(null)}>
                <FaTimes /> <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
