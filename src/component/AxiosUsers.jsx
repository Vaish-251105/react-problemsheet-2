import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AxiosUsers.css";

function AxiosUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="loading">
        <h2>Loading data...</h2>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="error">
        <h2>{error}</h2>
      </div>
    );
  }

  // SUCCESS
  return (
    <div className="table-container">
      <h2>User Data (Axios)</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AxiosUsers;