import React, { useState, useEffect } from 'react';
import { db, ref, onValue, remove } from "../firebase"; // import the remove function
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'; // import toast
import 'react-toastify/dist/ReactToastify.css'; // import toast CSS
import "./Home.css";

const Home = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const tasksRef = ref(db, "tasks");
        onValue(tasksRef, (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, []);
    

    const onDelete = (id) => {
        if (window.confirm("Are you sure that you want to delete this?")) {
            const taskRef = ref(db, `tasks/${id}`);
            remove(taskRef).then(() => {
                toast.success("Content Deleted Successfully");
            }).catch((err) => {
                toast.error(err.message);
            });
        }
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Description</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr key={id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data[id].id}</td>
                                <td>{data[id].name}</td>
                                <td>{data[id].description}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>
                                    <Link to={`/view/${id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
