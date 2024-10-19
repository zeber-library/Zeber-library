import React, { useState } from 'react';
import axios from 'axios';
import './ReelUpload.css';  // Import the CSS
import {useNavigate} from "react-router-dom"
const ReelUpload = () => {
  const [title, setTitle] = useState('');
  const [description,setDescription]=useState('')
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
const navigate=useNavigate();
  // Handle file input
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoFile) {
      setUploadStatus('Please provide both a title and video.');
      return;
    }

    const formData = new FormData();
    formData.append('description',description)
    formData.append('title', title);
    formData.append('video', videoFile);

    try {
      setUploadStatus('Uploading...');

      const response = await axios.post('http://localhost:8080/api/reels/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Reel uploaded successfully!');
      console.log('Uploaded reel data:', response.data);
    } catch (error) {
      console.error('Error uploading reel:', error);
      setUploadStatus('Error uploading reel.');
    }
    navigate('/reels');
  };

  return (
    <div className="container">
      <div className="upload-box">
        <h2>Upload a New Reel</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Upload Video:</label>
            <input type="file" onChange={handleFileChange} accept="video/*" required />
          </div>

          <button type="submit">Upload Reel</button>
        </form>

        {uploadStatus && <p className={`upload-status ${uploadStatus.includes('Error') ? 'error' : ''}`}>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default ReelUpload;
