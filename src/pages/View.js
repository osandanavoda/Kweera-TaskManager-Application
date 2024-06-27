import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase"; 
import "./View.css";

const View = () => {
  const [task, setTask] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskRef = db.ref(`tasks/${id}`);
        const snapshot = await taskRef.once("value");
        if (snapshot.exists()) {
          setTask(snapshot.val());
        } else {
          setTask({});
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Task Details</p>
        </div>
        <div className="container">
          <strong>Name:</strong>
          <span>{task.name}</span>
          <br />
          <br />
          <strong>Description:</strong>
          <span>{task.description}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
