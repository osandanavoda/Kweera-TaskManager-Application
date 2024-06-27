import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import { db, ref, push, set, onValue } from '../firebase'; 
import { toast } from 'react-toastify';

const initialState = {
    id: '',
    name: '',
    description: '',
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});
    const { id, name, description } = state;
    const navigate = useNavigate();
    const { id: paramId } = useParams();

    useEffect(() => {
        const tasksRef = ref(db, 'tasks');
        onValue(tasksRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val());
            } else {
                setData({});
            }
        });

        return () => {
            setData({});
        };
    }, []);

    useEffect(() => {
        if (paramId) {
            setState({ ...data[paramId], id: paramId });
        } else {
            setState({ ...initialState });
        }

        return () => {
            setState(initialState);
        };
    }, [paramId, data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description) {
            toast.error('Please provide valid inputs');
            return;
        }

        if (!id) {
            const tasksRef = ref(db, 'tasks');
            push(tasksRef, state)
                .then(() => {
                    toast.success('Task Added Successfully');
                    navigate('/');
                })
                .catch((err) => {
                    console.error('Error adding task:', err);
                    toast.error(err.message);
                });
        } else {
            const taskRef = ref(db, `tasks/${id}`);
            set(taskRef, state)
                .then(() => {
                    toast.success('Task Updated Successfully');
                    navigate('/');
                })
                .catch((err) => {
                    console.error('Error updating task:', err);
                    toast.error(err.message);
                });
        }
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <form
                style={{
                    margin: 'auto',
                    padding: '15px',
                    maxWidth: '400px',
                    alignContent: 'center',
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Task Name"
                    value={name}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Task Description"
                    value={description}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? 'Update' : 'Save'} />
            </form>
        </div>
    );
};

export default AddEdit;
