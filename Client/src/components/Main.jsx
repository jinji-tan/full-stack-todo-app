import { useState } from "react";
import Todo from "./Todo";
import View from "./View"
import { getTodoApi } from "../services/api"

const Main = ({ setPage }) => {
    const [tasks, setTasks] = useState([]);
    const [showTasks, setShowTasks] = useState(false);

    const logoutUser = () => {
        localStorage.removeItem('token');
        setPage("login");
    }

    const fetchTasks = async () => {
        try {
            const data = await getTodoApi();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
            alert("Could not load tasks");
        }
    };

    const toggleView = async () => {
        if (!showTasks) {
            await fetchTasks();
            setShowTasks(true);
        } else {
            setShowTasks(false);
        }
    };

    return (
        <div className="main">
            <div className="top-buttons">
                <button type="button" className="logout-button" onClick={logoutUser}>Logout</button>
                <button type="button" className="view-button" onClick={toggleView}>View</button>
            </div>

            <h1 className="main-title">TO-DO</h1>

            <Todo onRefresh={fetchTasks} />

            {showTasks && <View tasks={tasks} onRefresh={fetchTasks} />}
        </div>
    );
}

export default Main;