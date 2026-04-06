import React, { useEffect, useState } from "react";
import "./StateManager.css";

function StateManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }, []);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="state loading">
        <h2>⏳ Loading...</h2>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error) {
    return (
      <div className="state error">
        <h2>❌ {error}</h2>
      </div>
    );
  }

  // ✅ SUCCESS STATE
  return (
    <div className="state success">
      <h2>✅ Data Loaded Successfully</h2>

      {data.slice(0, 5).map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default StateManager;