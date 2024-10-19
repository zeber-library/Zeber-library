import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// Initialize the socket
const socket = io("http://localhost:8080", {
  reconnection: true,
});

function CommentBox({
  isCommentBoxActive,  // boolean to show the status of the comment box
  toggleCommentBox,    // function to toggle the comment box
  reelId               // ID of the reel to post the comment on
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const userId = "66ddfda258de85a04f9880fb";
  // Fetch initial comments from the server when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reels/${reelId}/getComments`);
        setComments(response.data.comments);
      } catch (err) {
        console.error('Error fetching comments', err);
      }
    };

    fetchComments();

    // Listen for real-time updates from the server for new comments
    socket.on('newComment', (data) => {
      if (data.reelId === reelId) {
        setComments((prevComments) => [...prevComments, data.comment]);
      }
    });

    return () => {
      socket.off('newComment');
    };
  }, [reelId]);

  // Handle submitting a new comment
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/reels/${reelId}/comment`, { userId:userId,text: newComment});
      console.log(response)
      setComments(response.data.reel.comments); // Update comments
      setNewComment(''); // Clear the textarea
      setError('');
    } catch (err) {
      console.error('Error submitting comment', err);
      setError('Error submitting comment');
    }
  };

  return (
    <div className={`comment-box ${isCommentBoxActive ? "active" : ""}`} id="commentBox">
      <div className="comment-box-header">
        <h3>Comments</h3>
        <button className="close-button" onClick={toggleCommentBox}>&times;</button>
              {/* Render comments */}
              <ul className="comment-list" style={{listStyle:'none'}}>
          {comments?.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index}>
                {comment.text}
              </li>
            ))
          ) : (
            <li>No comments yet.</li>
          )}
        </ul>
      </div>

      <div className="comment-box-body">
  

        {/* Comment submission */}
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="submit-comment" onClick={handleSubmitComment}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default CommentBox;

