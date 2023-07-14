import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

function Staff() {
    const [Users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MzI1MzE4LCJleHAiOjE2ODk0MTE3MTh9.pzxYhuZgJ9SLWDzj2oDACxSn7Lko6nWssHCy3xpfhbo';

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setCurrentPage(1);
        if (term === '') {
            fetchUsers();
        } else {
            const filteredUsers = Users.filter(
                (User) => User.fullName && User.fullName.toLowerCase().includes(term.toLowerCase()),
            );
            setUsers(filteredUsers);
        }
    };

    const fetchAttendance = async (phone) => {
        const response = await axios.get(`https://ygcapi.azurewebsites.net/api/attendance/${phone}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setAttendanceData(response.data);
        setIsModalOpen(true);
    };
    const banUnbanUser = async (userId) => {
        await axios.put(
            `https://ygcapi.azurewebsites.net/api/user/${userId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        // Update the Users state directly
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.userId === userId ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : user,
            ),
        );
    };

    const fetchUsers = async () => {
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const userData = response.data.filter((user) => user.role === 'STAFF');
        setUsers(userData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User page</h2>
            <div>
                <a href="/dashboard">Dashboard</a>
            </div>
            <div>
                <form onSubmit={handleSearch}>
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search User" />
                </form>
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>phone</th>
                            <th style={{ border: '1px solid black' }}>email</th>
                            <th style={{ border: '1px solid black' }}>full name</th>
                            <th style={{ border: '1px solid black' }}>address</th>
                            <th style={{ border: '1px solid black' }}>birthday</th>
                            <th style={{ border: '1px solid black' }}>role</th>
                            <th style={{ border: '1px solid black' }}>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((User) => (
                            <tr key={User.userId}>
                                <td style={{ border: '1px solid black' }}>{User.phone}</td>
                                <td style={{ border: '1px solid black' }}>{User.email}</td>
                                <td style={{ border: '1px solid black' }}>{User.fullName}</td>
                                <td style={{ border: '1px solid black' }}>{User.address}</td>
                                <td style={{ border: '1px solid black' }}>{User.dateOfBirth}</td>
                                <td style={{ border: '1px solid black' }}>{User.role}</td>
                                <td style={{ border: '1px solid black' }}>{User.status}</td>
                                <td>
                                    <button onClick={() => banUnbanUser(User.userId)}>
                                        {User.status === 'INACTIVE' ? 'Unban' : 'Ban'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => fetchAttendance(User.phone)}>Check Attendance</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {Array(Math.ceil(Users.length / itemsPerPage))
                    .fill()
                    .map((_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
            </div>
            <ReactModal isOpen={isModalOpen} ariaHideApp={false} onRequestClose={() => setIsModalOpen(false)}>
                {attendanceData.length > 0 ? (
                    attendanceData.map((data, index) => (
                        <div key={index}>
                            <h2>Attendance of {data.staff.fullName}</h2>
                            <p>Date: {data.date}</p>
                            <p>Check in: {data.checkinTime}</p>
                            <p>Check out: {data.checkoutTime}</p>
                        </div>
                    ))
                ) : (
                    <p>No attendance data available</p>
                )}
            </ReactModal>
        </div>
    );
}

export default Staff;
