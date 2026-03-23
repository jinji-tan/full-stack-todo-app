export const loginApi = async (email, password) => {
    const response = await fetch("/api/User/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Login failed")
    const data = await response.json();

    return await data.token;
}

export const registerApi = async (email, password) => {
    const response = await fetch("/api/User/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok)
        throw new Error("Register failed")

    return await response.json();
}

export const getTodoApi = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch("/api/Todo", {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok)
        throw new Error("Failed to fetch");

    return await response.json();
}

export const addTodoApi = async (todoDto) => {
    const token = localStorage.getItem('token')
    const response = await fetch("/api/Todo", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todoDto),
    });
    if (!response.ok)
        throw new Error("Failed to add task");

    return await response.json();
}

export const updateTodoApi = async (id, todoDto) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/Todo/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todoDto),
    });
    if (!response.ok)
        throw new Error("Failed to update task");

    return await response.json();
}

export const deleteTodoApi = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/Todo/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok)
        throw new Error("Failed to delete task");

    return await response.json();
}