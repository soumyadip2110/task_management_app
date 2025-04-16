import React, { useState } from 'react'

function AddTask({ hidden, updateTasks }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            status: status
        }

        // Storing new task into local storage
        let allTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
        allTasks.push(newTask);
        allTasks = JSON.stringify(allTasks)
        window.localStorage.setItem('tasks', allTasks)

        // Sample fetch API of POST type for adding task
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json: charset=UTF-8'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Task created, status code: ', data);
            })
            .catch(e => alert('Something went wrong, please try again!'))
            .finally(() => {
                updateTasks();
                setTitle('');
                setDescription('');
                setStatus('To Do');
                setSubmitting(false);
            });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`mx-auto w-full max-w-sm bg-white rounded-md shadow-md px-4 py-2 mt-2 transition-all duration-300 ${hidden ? 'hidden' : ''}`}
        >
            <h2 className="text-md font-semibold text-gray-800 mb-2 text-center">Add Task</h2>

            {/* Title */}
            <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="w-full px-2 py-0.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                />
            </div>

            {/* Description */}
            <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-2 py-0.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
            </div>

            {/* Status */}
            <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-2 py-0.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            {/* Add button */}
            <button
                disabled={submitting}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 text-sm transition cursor-pointer"
            >
                {submitting ? 'Adding...' : 'Add'}
            </button>
        </form>
    )
}

export default AddTask
