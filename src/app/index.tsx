'use client'; // Enables client-side rendering components
import { useEffect, useState } from 'react';
import TodoList from '@/components/TodoList'; // Import the reusable TodoList component

// Server-side function to fetch initial todos
export async function getServerSideProps() {
    const initialTodos = [
        { id: 1, title: 'Learn Next.js' },
        { id: 2, title: 'Build a To-Do App' },
    ]; // Mock data; replace with API/database fetch if needed.

    return { props: { initialTodos } };
}

export default function Home({ initialTodos }: { initialTodos: { id: number; title: string }[] }) {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333', textAlign: 'center' }}>My To-Do List</h1>
            <TodoList initialTodos={initialTodos} />
        </div>
    );
}
