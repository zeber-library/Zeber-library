import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { io } from "socket.io-client"; // Import socket.io-client
const FourthPage = ({ book }) => {
  const [selectedRating, setSelectedRating] = useState(0); // Store the selected rating
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState(2);
  const bookId = book?._id;
  const [showBookCommentComponent, setBookCommentComponent] = useState(false);
  const userId = "66ddfda258de85a04f9880fb"; // Replace with actual user ID from your auth context
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [ratingSuccessMessage, setRatingSuccessMessage] = useState("");
  const socket = useRef(null); // Use ref for socket connection
  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString(undefined, options);
  // };
  const [ratings, setRatings] = useState({
    totalRatings: 0,
    averageRating: 0,
    ratings: [],
  });

  // Fetch ratings when component mounts or when bookId changes
  useEffect(() => {
    const fetchRatings = async () => {
      if (!bookId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/${bookId}/ratings`
        );
        setRatings(response.data);
        console.log(ratings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const data= await axios.post(`http://localhost:5000/api/${bookId}/comments`, {
        text: comment,
        userId,
      });
      console.log(data)
      setComment(""); // Clear the form
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error submitting comment", error);
      setError("Failed to submit the comment.");
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/${bookId}/rating`, {
        rating: selectedRating,
        userId,
      });
      setRatingSuccessMessage("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating", error);
      setRatingSuccessMessage("Failed to submit rating. Please try again.");
    }
  };

  // Function to fetch comments from the backend
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${bookId}/comments`
      );
      setComments(response.data.comments);
    } catch (err) {
      setError("Error fetching comments");
    }
  };

  useEffect(() => {
    fetchComments();
  });

  useEffect(() => {
    const stars = document.querySelectorAll("#ratingContainer .fa-star");

    const updateStars = (rating, permanent = true) => {
      stars.forEach((star) => {
        const starValue = parseInt(star.getAttribute("data-value"));
        star.style.color = starValue <= rating ? "#ffcc00" : "#ddd";
      });
    };

    stars.forEach((star) => {
      star.addEventListener("click", (e) => {
        const rating = e.target.getAttribute("data-value");
        setSelectedRating(rating);
        updateStars(rating);
        const ratingText = ["", "Poor", "Ok", "Good", "Very Good", "Excellent"];
        document.querySelector("#rateText").textContent = ratingText[rating];
      });

      star.addEventListener("mouseover", (e) => {
        const hoverValue = e.target.getAttribute("data-value");
        updateStars(hoverValue, false);
      });

      star.addEventListener("mouseout", () => {
        updateStars(selectedRating, true);
      });
    });
  }, [selectedRating]);

  useEffect(() => {
    // Listen for real-time likes
    socket.current = io("http://localhost:5000");
    socket.current.on("commentLiked", (data) => {
      // Update the comment's like count in real-time
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === data.commentId
            ? { ...comment, likes: [...comment.likes, data.userId] }
            : comment
        )
      );
    });

    // Cleanup on unmount
    return () => {
      socket.current.off("commentLiked");
    };
  }, [bookId]);

  // Handle like button click
  const likeComment = async (commentId) => {
    try {
      await axios.post(`http://localhost:5000/api/${bookId}/comments/${commentId}/like`, { userId });
      // Emit the real-time update to the server
      socket.emit("likeComment", { commentId, userId });
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };


  // Connect to Socket.IO and listen for new comments
  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:5000"); // Adjust the URL to your server

    // Listen for real-time updates when a new comment is added
    socket.current.on("commentAdded", (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);
  return (
    <div id="FourthPage">
      <section>
        <div className="heading">
          <h1>Ratings & Reviews</h1>

          <div>
            <h2
              onClick={() => setBookCommentComponent(!showBookCommentComponent)}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              Write Review
            </h2>
            {showBookCommentComponent ? (
              <div>
                <form
                  onSubmit={handleCommentSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <label htmlFor="comment"></label>
                    <textarea
                      id="comment"
                      style={{
                        width: "18rem",
                        resize: "none",
                        padding: "12px 12px",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your comment here"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ color: "green", marginTop: "1rem" }}
                  >
                    Submit Comment
                  </button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Star Rating UI */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "green",
              width: "5rem",
              height: "5rem",
              borderRadius: ".5rem",
              color: "white",
              fontSize: "1.3rem",
            }}
          >
            <span>
              {ratings?.averageRating}{" "}
              <span style={{ color: "gold" }}> &#9733; </span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>How would you like to rate this book?</h3>
            <div id="ratingContainer">
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <i key={value} className="fa fa-star" data-value={value}></i>
                ))}
              </div>
              <span id="rateText"></span>
            </div>
            <button
              onClick={handleRatingSubmit}
              style={{ marginTop: "10px", width: "50%" }}
            >
              Submit Rating
            </button>
            {ratingSuccessMessage && <p>{ratingSuccessMessage}</p>}
          </div>
        </div>

        {/* Comments Section */}
        <aside>
          <div className="comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="CommentHeading">
                  <span>
                    {ratings?.averageRating}{" "}
                    <span style={{ color: "gold" }}> &#9733; </span>
                  </span>
                  <span className="title">{comment.text}</span>
                </div>
                <div className="commentText">
                  <p>{comment.body}</p>
                  <p className="aboutWriter">
                    {comment.user}{" "}
                    <span className="time">
                      ●&nbsp;{format(comment.createdAt)} &nbsp;●
                    </span>
                    <span
                      className="like"
                      onClick={() => likeComment(comment._id)}
                    >
                      <i className="fa fa-thumbs-up"></i>&nbsp;{" "}
                      <span style={{ color: "#007BFF" }}>{comment.likes.length}</span>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {displayedComments < comments.length && (
            <button
              className="show-more"
              onClick={() => setDisplayedComments(displayedComments + 2)}
            >
              Show More
            </button>
          )}
        </aside>
      </section>
    </div>
  );
};

export default FourthPage;
