'use client';
// This line tells Next.js that this component is client-side and can use hooks like useState and useEffect.

import { useEffect, useState } from "react";
// Importing React hooks: 
// - useState: to manage state in the component.
// - useEffect: (not used in this code but typically used for side effects).

export default function TodoList({ initialTodos }: { initialTodos: { id: number; title: string }[] }) {
    // Component declaration. It accepts a prop called `initialTodos` which is an array of to-do items.

    const [todos, setTodos] = useState(initialTodos);
    // `todos` is the state that holds the current list of to-do items.
    // `setTodos` is a function used to update the `todos` state.

    const [newTodo, setNewTodo] = useState("");
    // `newTodo` is the state for the input where users type a new to-do.
    // Initially, it is an empty string.

    const addTodo = () => {
        // This function is triggered when the "Add" button is clicked.
        if (newTodo.trim() === "") return;
        // Prevents adding empty to-dos by checking if the input is just whitespace.

        const newTodoItem = { id: Date.now(), title: newTodo };
        // Creates a new to-do object with a unique ID (based on the current timestamp) and the title from the input.

        setTodos([...todos, newTodoItem]);
        // Updates the `todos` state by appending the new to-do to the existing list.

        setNewTodo("");
        // Clears the input field by resetting the `newTodo` state.
    };

    const deleteTodo = (id: number) => {
        // This function is triggered when the "Delete" button is clicked for a to-do.
        setTodos(todos.filter((todo) => todo.id !== id));
        // Filters out the to-do with the specified ID and updates the `todos` state.
    };

    return (
        <div>
            {/* Input field for adding new to-dos */}
            <input
                value={newTodo} // Binds the value of the input to the `newTodo` state.
                onChange={(e) => setNewTodo(e.target.value)} // Updates the `newTodo` state as the user types.
                placeholder="Add a new task" // Placeholder text shown in the input field.
            />
            {/* Button to add a new to-do */}
            <button onClick={addTodo}>Add</button>

            {/* List of to-dos */}
            <ul>
                {todos.map((todo) => (
                    // Iterates over the `todos` array and renders each to-do as a list item.
                    <li key={todo.id}>
                        {/* Displays the title of the to-do */}
                        {todo.title}
                        {/* Button to delete the current to-do */}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
