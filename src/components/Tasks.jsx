import React from 'react'

function Tasks({ task, deleteTask }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', task.id);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    }

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 m-2 hover:shadow-md transition-shadow duration-200 cursor-move"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-lg font-semibold text-gray-800">{task.title}</h1>
                <button
                    onClick={handleDelete}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                >
                    Delete
                </button>
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            )}
        </div>
    )
}

export default Tasks
