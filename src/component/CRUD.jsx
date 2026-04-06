import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CRUD.css";

function CRUD() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/posts";

  // READ
  useEffect(() => {
    axios.get(API).then((res) => {
      setPosts(res.data.slice(0, 5));
    });
  }, []);

  // CREATE
  const addPost = () => {
    if (!title) return alert("Enter title");

    axios.post(API, { title }).then((res) => {
      setPosts([...posts, res.data]);
      setTitle("");
    });
  };

  // UPDATE
  const updatePost = () => {
    axios.put(`${API}/${editingId}`, { title }).then(() => {
      setPosts(
        posts.map((post) =>
          post.id === editingId ? { ...post, title } : post
        )
      );
      setTitle("");
      setEditingId(null);
    });
  };

  // DELETE
  const deletePost = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  // EDIT MODE
  const editPost = (post) => {
    setTitle(post.title);
    setEditingId(post.id);
  };

  return (
    <div className="crud-container">
      <h2>CRUD Operations</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {editingId ? (
          <button onClick={updatePost}>Update</button>
        ) : (
          <button onClick={addPost}>Add</button>
        )}
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p>{post.title}</p>

            <div className="btn-group">
              <button onClick={() => editPost(post)}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CRUD;