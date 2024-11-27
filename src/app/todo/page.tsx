'use client';

import { useState } from 'react';

const TodoPage = () => {
    const [todos, setTodos] = useState<string[]>(['Learn Next.js', 'Build a To-Do App']);

    const addTodo = () => {
        const newTodo = prompt('Enter a new to-do:');
        if (newTodo) {
            setTodos([...todos, newTodo]);
        }
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>My To-Do List</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} style={{ margin: '10px 0' }}>
                        {todo}
                        <button
                            onClick={() => deleteTodo(index)}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={addTodo} style={{ marginTop: '20px' }}>
                Add To-Do
            </button>
        </div>
    );
};

export default TodoPage;
