import React, { useState } from "react";

function CommentBox({
  isCommentBoxActive  ,  // boolean to show the status of the comment box
  toggleCommentBox // function to toggle the comment box 
}) {

  return (
    <div className={`comment-box ${isCommentBoxActive ? "active" : ""}`} id="commentBox">
      <div className="comment-box-header">
        <h3>Comments</h3>


        {/*button to toggle the comment box */}
        <button className="close-button" onClick={toggleCommentBox}>&times;</button>
      </div>


      {/**for commenting  */}
      <div className="comment-box-body">
        <textarea placeholder="Write a comment..."></textarea>
        <button className="submit-comment">Submit</button>
      </div>
    </div>
  );
}

export default CommentBox;
