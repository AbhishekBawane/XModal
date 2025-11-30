import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const closeModal = () => {
    setShowModal(false);
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
  };

  const handleSubmit = () => {
    // USERNAME → browser tooltip
    const usernameInput = document.getElementById("username");
    if (!username.trim()) {
      usernameInput.setCustomValidity("Please fill out this Filed.");
      usernameInput.reportValidity();
      return;
    } else {
      usernameInput.setCustomValidity("");
    }

    // EMAIL → browser tooltip
    const emailInput = document.getElementById("email");
    if (!email.trim()) {
      emailInput.setCustomValidity("Email cannot be empty.");
      emailInput.reportValidity();
      return;
    }
    if (!email.includes("@")) {
      emailInput.setCustomValidity(`Please include an '@' in the email address.'${email}' is missing an @`);
      emailInput.reportValidity();
      return;
    } else {
      emailInput.setCustomValidity("");
    }

    // PHONE → JS alert
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB → JS alert
    const today = new Date();
    const entered = new Date(dob);
    if (entered > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    closeModal();
  };

  return (
    <div className="modal">
      <div
        className={`modal-container ${showModal ? "blur-bg" : ""}`}
        onClick={() => showModal && closeModal()}
      >
        {/* Initial page */}
        {!showModal && (
          <div className="initial-page" onClick={(e) => e.stopPropagation()}>
            <h1>User Details Modal</h1>
            <button
              className="open-btn"
              onClick={() => setShowModal(true)}
            >
              Open Form
            </button>
          </div>
        )}

        {/* Modal form */}
        {showModal && (
          <form
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Fill Details</h2>

            <label>Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email Address:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Phone Number:</label>
            <input
              id="phone"
              type="text"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Date of Birth:</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
