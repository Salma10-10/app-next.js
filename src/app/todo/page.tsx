'use client';
import { useEffect, useState } from 'react';

export default function TodoPage() {
    // State to store to-do items
    const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState<number | null>(null); // State for editing
    const [editTodoTitle, setEditTodoTitle] = useState('');

    // Load to-do items from localStorage when the component mounts
    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // Save to-do items to localStorage whenever the list changes
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    // Add a new to-do item
    const addTodo = () => {
        if (newTodo.trim() === '') return;
        const newTodoItem = {
            id: Date.now(), // Unique id using the current timestamp
            title: newTodo,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    // Edit a to-do item
    const editTodo = (id: number, title: string) => {
        setEditTodoId(id);
        setEditTodoTitle(title);
    };

    // Save edited to-do item
    const saveEdit = () => {
        const updatedTodos = todos.map(todo =>
            todo.id === editTodoId ? { ...todo, title: editTodoTitle } : todo
        );
        setTodos(updatedTodos);
        setEditTodoId(null); // Close editing mode
        setEditTodoTitle('');
    };

    // Delete a to-do item
    const deleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>To-Do List</h1>

            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new to-do"
                style={styles.input}
            />
            <button onClick={addTodo} style={styles.addBtn}>Add</button>

            <ul style={styles.todoList}>
                {todos.map(todo => (
                    <li key={todo.id} style={styles.todoItem}>
                        {editTodoId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTodoTitle}
                                    onChange={(e) => setEditTodoTitle(e.target.value)}
                                    style={styles.input}
                                />
                                <button onClick={saveEdit} style={styles.addBtn}>Save</button>
                            </>
                        ) : (
                            <>
                                {todo.title}
                                <button onClick={() => deleteTodo(todo.id)} style={styles.deleteBtn}>Delete</button>
                                <button onClick={() => editTodo(todo.id, todo.title)} style={styles.editBtn}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
        padding: '20px',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%',
        maxWidth: '300px',
    },
    addBtn: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    todoList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        width: '100%',
        maxWidth: '400px',
    },
    todoItem: {
        backgroundColor: '#fff',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    deleteBtn: {
        backgroundColor: '#FF6347',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    editBtn: {
        backgroundColor: '#FFD700',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};
