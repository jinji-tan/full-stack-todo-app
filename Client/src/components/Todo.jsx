import { useState } from "react";
import { addTodoApi } from "../services/api";

const Todo = ({ onRefresh }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await addTodoApi({ title, description, isCompleted });
            setTitle("");
            setDescription("");
            setIsCompleted(false);
            alert("Task saved!");
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error(error);
            alert("Failed to save task");
        }
    };

    return (
        <form className="task-form" onSubmit={handleSave}>
            <h2 className="task-number">New Task</h2>
            
            <label>Task Title:</label>
            <input
                className="task-title"
                type="text"
                required
                maxLength={200}
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description:</label>
            <textarea
                className="description"
                maxLength={500}
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="isCompleted-new"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                />
                <label htmlFor="isCompleted-new">Is Completed</label>
            </div>

            <button className="save-task-button" type="submit">SAVE TASK</button>
        </form>
    )
}

export default Todo