import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './UserManagementPage.css'

interface User {
    _id?: string;
    username: string;
    age: number;
    hobbies: string[];
}

const UserManagement: React.FC<{}> = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState<{
        _id?: string;
        username: string;
        age: number | string;
        hobbies: string[];
    }>({
        _id: undefined,
        username: '',
        age: '',
        hobbies: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/users`);
            setUsers(response.data.users);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users.');
            toast.error('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                name === 'age'
                    ? value
                    : name === 'hobbies'
                        ? value.split(',').map((hobby) => hobby.trim())
                        : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.username || !formData.age) {
            toast.error('Username and age are required!');
            return;
        }
        setLoading(true);
        try {
            const payload = {
                username: formData.username,
                age: Number(formData.age),
                hobbies: formData.hobbies,
            };
            if (isEditing) {
                await axios.put(`/users/${formData._id}`, payload);
                toast.success('User updated successfully!');
                setIsEditing(false);
            } else {
                await axios.post('/users', payload);
                toast.success('User created successfully!');
            }
            setFormData({ username: '', age: '', hobbies: [] });
            fetchUsers();
            setError(null);
        } catch (err) {
            setError('An error occurred while saving the user.');
            toast.error('Failed to save user.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: User) => {
        setFormData({
            _id: user._id,
            username: user.username,
            age: user.age,
            hobbies: user.hobbies,
        });
        setIsEditing(true);
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        setLoading(true);
        try {
            await axios.delete(`/users/${userId}`);
            toast.success('User deleted successfully!');
            fetchUsers();
            setError(null);
        } catch (err) {
            setError('Failed to delete user.');
            toast.error('Failed to delete user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="header">User Management</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min={1}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label>Hobbies (comma-separated):</label>
                    <textarea
                        name="hobbies"
                        value={formData.hobbies}
                        onChange={handleInputChange}
                        className="textarea"
                    />
                </div>
                <button type="submit" className="button" disabled={loading}>
                    {isEditing ? 'Update User' : 'Create User'}
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <ul className="user-list">
                {users.map((user) => (
                    <li key={user._id} className="user-item">
                        <span>
                            {user.username} (Age: {user.age})
                        </span>
                        <div className="actions">
                            <button onClick={() => handleEdit(user)} className="button">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(user._id!)} className="button danger">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Toaster position="top-right" />
        </div>
    );
};

export default UserManagement;
