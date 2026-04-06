import React, { useEffect, useState } from "react";
import "./ErrorHandling.css";

function ErrorHandling() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/invalid-url") // ❌ WRONG URL for error
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="error">
        <h2>⚠️ {error}</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  // SUCCESS (fallback UI)
  return (
    <div className="success">
      <h2>Data Loaded Successfully</h2>
      {data.slice(0, 5).map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default ErrorHandling;