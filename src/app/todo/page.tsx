'use client';

import { useState, useEffect } from 'react';

const TodoPage = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setTodos(['Learn Next.js', 'Build a To-Do App']); // Mock initial data
    }, []);

    const addTodo = () => {
        const newTodo = prompt('Enter a new to-do:');
        if (newTodo) {
            setTodos([...todos, newTodo]);
        }
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const updateTodo = (index: number) => {
        const updatedTodo = prompt('Edit your to-do:', todos[index]);
        if (updatedTodo) {
            const updatedTodos = [...todos];
            updatedTodos[index] = updatedTodo;
            setTodos(updatedTodos);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>My To-Do List</h1>
                <ul style={styles.list}>
                    {todos.map((todo, index) => (
                        <li key={index} style={styles.listItem}>
                            <span>{todo}</span>
                            <button onClick={() => deleteTodo(index)} style={styles.deleteButton}>
                                Delete
                            </button>
                            <button onClick={() => updateTodo(index)} style={styles.editButton}>
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={addTodo} style={styles.addButton}>
                    Add To-Do
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '300px',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    editButton: {
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    addButton: {
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default TodoPage;
