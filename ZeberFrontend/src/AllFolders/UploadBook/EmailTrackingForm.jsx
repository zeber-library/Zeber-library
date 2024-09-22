import React, { useState } from "react";
import axios from "axios";


export default function EmailTrackingForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/submit-email', { email });
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="email-tracking-form-container">
      {submitted ? (
        <p className="email-tracking-success-message">
          Thank you! We've received your email. You will be notified about your book's status.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="email-tracking-form">
          <label htmlFor="email" className="email-tracking-label">
            Enter email to track your book confirmation
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-tracking-input"
            required
          />
          <button
            type="submit"
            className="email-tracking-submit-button"
          >
            Submit
          </button>
          {error && (
            <p className="email-tracking-error-message">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
