import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        displayName: "",
        userName: "",
        email: "",
        role: "User", 
        status: "InActive", 
        password: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${BASE_URL}/auth`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };
    console.log(newUser);


    const handleAddOrEditUser = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            if (editingUser) {
                // Edit existing user
                const response = await axios.put(`${BASE_URL}/auth/${editingUser.id}`, {
                    username: newUser.userName,
                    displayName: newUser.displayName,
                    email: newUser.email,
                    role: newUser.role,
                    status: newUser.status
                });

                if (response.status === 200) {
                    setShowModal(false);
                    setEditingUser(null);
                    await fetchUsers();
                    toast.success('User updated successfully!');
                }
            } else {
                // Add new user
                const response = await axios.post(`${BASE_URL}/auth/signup`, {
                    username: newUser.userName,
                    displayName: newUser.displayName,
                    email: newUser.email,
                    role: newUser.role,
                    password: newUser.password,
                    status: newUser.status || "InActive"
                });
                console.log(newUser);


                if (response.status === 200) {
                    setShowModal(false);
                    await fetchUsers();
                    toast.success('User created successfully!');
                }
            }

            setNewUser({
                displayName: "",
                userName: "",
                email: "",
                role: "User",
                status: "InActive",
                password: "",
            });
        } catch (error) {
            console.error('Error creating/updating user:', error);
            toast.error(error.response?.data?.message || 'Error processing user. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser({
            displayName: user.displayName,
            userName: user.username,
            email: user.email,
            role: user.role,
            password: '',
            status: user.status
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.delete(`${BASE_URL}/auth/${id}`);
            if (response.status === 204) {
                await fetchUsers();
                toast.success('User Deleted successfully!');
            }
        } catch (error) {
            toast.error('Error deleting user:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between">
                <h2 className="font-bold md:text-3xl text-primaryColor">User Management</h2>

                <button onClick={() => {
                    setNewUser({ userName: "", email: "", role: "User", password: "" });
                    setEditingUser(null);
                    setShowModal(true);
                }} className="bg-green-500 text-white md:px-4 md:py-2 px-2 py-1 md:text-md text-sm rounded-md flex items-center md:gap-2 gap-0">
                    <FaPlus /> Add User
                </button>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="flex justify-center items-center h-[80vh]">
                    <img src="./loading.svg" />

                </div>
            ) : (
                /* Data Display Table */
                <div className="w-full overflow-x-auto">
                    <div className="max-w-[180px] md:max-w-full">
                        <table className="w-full text-sm text-left text-gray-500 border rounded-md">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-primaryColor">User Name</th>
                                    <th scope="col" className="px-6 py-3 text-primaryColor">Email</th>
                                    <th scope="col" className="px-6 py-3 text-primaryColor">Role</th>
                                    <th scope="col" className="px-6 py-3 text-primaryColor">Status</th>
                                    <th scope="col" className="px-6 py-3 text-primaryColor">Created Date</th>
                                    <th scope="col" className="px-6 py-3 text-primaryColor">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{moment(user.createdAt).format("DD-MMM-YYYY")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => handleEdit(user)} className="py-1 px-4 rounded-sm bg-yellow-500 text-white hover:bg-yellow-600 mr-2">Edit</button>
                                            {/* <button onClick={() => handleDelete(user.id)} className="py-1 px-4 rounded-sm bg-red-500 text-white hover:bg-red-600">Delete</button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal for adding/editing User */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-full max-w-lg">
                        <h3 className="text-lg font-semibold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                        <form onSubmit={handleAddOrEditUser}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="displayName" className="block mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={newUser.displayName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="userName" className="block mb-2">User Name</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={newUser.userName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={editingUser}
                                        className={`w-full p-2 border border-gray-300 rounded-md ${editingUser ? "disabled:cursor-not-allowed bg-gray-200" : ""}`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={editingUser}
                                        className={`w-full p-2 border border-gray-300 rounded-md ${editingUser ? "disabled:cursor-not-allowed bg-gray-200" : ""}`}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2">Role</label>
                                    <select
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block mb-2">Status</label>
                                    <select
                                        name="status"
                                        value={newUser.status}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="InActive">Inactive</option>
                                        <option value="Active">Active</option>
                                    </select>
                                </div>
                                {!editingUser && (
                                    <div>
                                        <label htmlFor="password" className="block mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={newUser.password}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                >
                                    {editingUser ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            )}
            <ToastContainer/>
        </div>
    );
}

export default UserManagement;
