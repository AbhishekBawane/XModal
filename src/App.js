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

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    if (!username.trim()) {
      usernameInput.setCustomValidity("Username cannot be empty.");
      usernameInput.reportValidity();
      return;
    }
    usernameInput.setCustomValidity("");


    const emailInput = document.getElementById("email");
    if (!email.trim()) {
      emailInput.setCustomValidity("Email cannot be empty.");
      emailInput.reportValidity();
      return;
    }
    if (!email.includes("@")) {
      emailInput.setCustomValidity(`Please include an '@' in the email address.'${email}' is missing @.`);
      emailInput.reportValidity();
      return;
    }
    emailInput.setCustomValidity("");


    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }


    const today = new Date();
    const enteredDate = new Date(dob);

    if (enteredDate > today) {
      alert("Invalid date of birth. Date of bith cannot be in the future.");
      return;
    }

    closeModal();
  };

  return (
    <>
      {!showModal && (
        <div className="initial-page">
          <h1>User Details Modal</h1>
          <button className="open-btn" onClick={() => setShowModal(true)}>
            Open Form
          </button>
        </div>
      )}

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <form
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
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

            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
