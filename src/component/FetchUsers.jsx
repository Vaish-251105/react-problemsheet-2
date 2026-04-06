import React, { useEffect, useState } from "react";
import "./FetchUsers.css";

function FetchUsers() {
  const API = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch users");
          }
          return res.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 2000);
  }, []);

  // ✅ LOADING
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  // ✅ ERROR
  if (error) {
    return (
      <div className="error-container">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  // ✅ SUCCESS
 return (
  <div className="users-container">
    <h2>User List</h2>

    {/* 🔥 NEW WRAPPER */}
    <div className="grid-wrapper">
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>

            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

            <p>
              <strong>Website:</strong>{" "}
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </p>

            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default FetchUsers;