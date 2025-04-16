import React from 'react'
import Tasks from './Tasks'

function Tab({ title, children, tasks, onDropTask, updateTasks }) {
    const allowDrop = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        onDropTask(taskId, title);
    };

    const deleteTask = (taskId) => {
        const updated = tasks?.filter(task => task.id != taskId ? task : null);
        const newTasks = JSON.stringify(updated)
        window.localStorage.setItem('tasks', newTasks)
        updateTasks();
    }

    return (
        <div
            className="md:h-[500px] w-full m-4 p-3 rounded-lg shadow-sm overflow-auto"
            onDragOver={allowDrop}
            onDrop={handleDrop}
        >
            <div className={`text-lg font-semibold px-2 py-1 border-b-2 rounded-t ${children}`}>
                {title}
            </div>

            {/* Rendering each tasks based on their status */}
            <div className="mt-2">
                {tasks.map((task) =>
                    task.status === title ? (
                        <Tasks key={task.id} task={task} deleteTask={deleteTask} />
                    ) : null
                )}
            </div>
        </div>
    )
}

export default Tab
