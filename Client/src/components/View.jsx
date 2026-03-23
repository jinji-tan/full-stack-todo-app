import { useState } from "react";
import { updateTodoApi, deleteTodoApi } from "../services/api";

const TaskCard = ({ task, onRefresh }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const handleSave = async () => {
        try {
            await updateTodoApi(task.taskId, { title, description, isCompleted });
            setIsEditing(false);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error(error);
            alert("Failed to update task");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTodoApi(task.taskId);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete task");
        }
    };

    return (
        <div className="task-card">
            <h2 className="task-number">Task #{task.taskId}</h2>

            <label>Task Title:</label>
            <input
                className="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={!isEditing}
            />

            <label>Description:</label>
            <textarea
                className="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                readOnly={!isEditing}
            />

            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id={`isCompleted-${task.taskId}`}
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    disabled={!isEditing}
                />
                <label htmlFor={`isCompleted-${task.taskId}`}>Is Completed</label>
            </div>

            <div className="button-group">
                {isEditing ? (
                    <>
                        <button type="button" className="save-task-button" onClick={handleSave}>SAVE</button>
                        <button type="button" className="cancel-task-button" onClick={() => {
                            setIsEditing(false);
                            setTitle(task.title);
                            setDescription(task.description || "");
                            setIsCompleted(task.isCompleted);
                        }}>CANCEL</button>
                    </>
                ) : (
                    <div className="actions">
                        <button type="button" className="action-button" onClick={() => setIsEditing(true)}>EDIT</button>
                        <button type="button" className="action-button" onClick={handleDelete}>DELETE</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const View = ({ tasks, onRefresh }) => {
    return (
        <div className="task-container">
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard key={task.taskId} task={task} onRefresh={onRefresh} />
                ))
            )}
        </div>
    );
};

export default View;