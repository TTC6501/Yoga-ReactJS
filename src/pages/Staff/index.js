import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Staff.css';

function Staff() {
    // const attendanceURL = 'http://localhost:8080/api/attendance';
    // const userURL = 'http://localhost:8080/api/user';
    const attendanceURL = 'https://ygcapi.azurewebsites.net/api/attendance';
    const userURL = 'https://ygcapi.azurewebsites.net/api/user';

    const [Users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [attendancePage, setAttendancePage] = useState(1);
    const itemsPerPage = 6;
    const itemsPerPageModal = 7;
    const token = useSelector((state) => state.user.token);

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
        const response = await axios.get(attendanceURL + '/' + phone, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setAttendanceData(response.data);
        setIsModalOpen(true);
    };
    const banUnbanUser = async (userId) => {
        await axios.put(userURL + '/' + userId,
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

    const checkInUser = async (phone) => {
        try {
            const response = await axios.post(attendanceURL + '/' + phone,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (response.status === 200) {
                alert('Check in successful');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('User already checked in');
            }
        }
    };

    const checkOutUser = async (phone) => {
        try {
            const response = await axios.put(attendanceURL + '/' + phone,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (response.status === 200) {
                alert('Check out successful');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('User already checked out');
            }
        }
    };

    const fetchUsers = async () => {
        const response = await axios.get(userURL, {
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
        <div className="container">
            <h2 className="title">Staff page</h2>
            <div>
                <Link className="dashboard-link" to="/dashboard">
                    Dashboard
                </Link>
            </div>
            <div>
                <form onSubmit={handleSearch}>
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search User" />
                </form>
                <table className="table" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>phone</th>
                            <th style={{ border: '1px solid black' }}>email</th>
                            <th style={{ border: '1px solid black' }}>full name</th>
                            <th style={{ border: '1px solid black' }}>address</th>
                            <th style={{ border: '1px solid black' }}>birthday</th>
                            <th style={{ border: '1px solid black' }}>role</th>
                            <th style={{ border: '1px solid black' }}>status</th>
                            {/* <th style={{ border: '1px solid black' }}>ban</th>
                            <th style={{ border: '1px solid black' }}>check in</th>
                            <th style={{ border: '1px solid black' }}>check out</th>
                            <th style={{ border: '1px solid black' }}>check attendance</th> */}
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
                                <td
                                    style={{
                                        border: '1px solid black',
                                        color: User.status === 'ACTIVE' ? 'green' : 'red',
                                    }}
                                >
                                    {User.status}
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button
                                        style={{
                                            backgroundColor: User.status === 'INACTIVE' ? 'green' : 'red',
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '10px 15px',
                                            display: 'inline-block',
                                            border: 'none',
                                            cursor: 'pointer',
                                            margin: '4px 2px',
                                        }}
                                        onClick={() => banUnbanUser(User.userId)}
                                    >
                                        {User.status === 'INACTIVE' ? 'Unban' : 'Ban'}
                                    </button>
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '10px 20px',
                                            display: 'inline-block',
                                            border: 'none',
                                            cursor: 'pointer',
                                            margin: '4px 2px',
                                        }}
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to check out?')) {
                                                checkInUser(User.phone);
                                            }
                                        }}
                                    >
                                        Check In
                                    </button>
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '10px 15px',
                                            display: 'inline-block',
                                            border: 'none',
                                            cursor: 'pointer',
                                            margin: '4px 2px',
                                        }}
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to check out?')) {
                                                checkOutUser(User.phone);
                                            }
                                        }}
                                    >
                                        Check Out
                                    </button>
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button
                                        style={{
                                            backgroundColor: '#ffc107',
                                            color: 'black',
                                            borderRadius: '5px',
                                            padding: '10px 15px',
                                            display: 'inline-block',
                                            border: 'none',
                                            cursor: 'pointer',
                                            margin: '4px 2px',
                                        }}
                                        onClick={() => fetchAttendance(User.phone)}
                                    >
                                        Check Attendance
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
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
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData
                                .slice((attendancePage - 1) * itemsPerPageModal, attendancePage * itemsPerPageModal)
                                .map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.date}</td>
                                        <td>{data.checkinTime}</td>
                                        <td>{data.checkoutTime}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No attendance data available</p>
                )}
                <div className="pagination">
                    {Array(Math.ceil(attendanceData.length / itemsPerPageModal))
                        .fill()
                        .map((_, index) => (
                            <button key={index} onClick={() => setAttendancePage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                </div>
            </ReactModal>
        </div>
    );
}

export default Staff;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactModal from 'react-modal';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// function Staff() {
//     const [Users, setUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [attendancePage, setAttendancePage] = useState(1);
//     const itemsPerPage = 6;
//     const itemsPerPageModal = 7;
//     const token = useSelector((state) => state.user.token);

//     const handleSearch = (e) => {
//         const term = e.target.value;
//         setSearchTerm(term);
//         setCurrentPage(1);
//         if (term === '') {
//             fetchUsers();
//         } else {
//             const filteredUsers = Users.filter(
//                 (User) => User.fullName && User.fullName.toLowerCase().includes(term.toLowerCase()),
//             );
//             setUsers(filteredUsers);
//         }
//     };

//     const fetchAttendance = async (phone) => {
//         const response = await axios.get(`https://ygcapi.azurewebsites.net/api/attendance/${phone}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         setAttendanceData(response.data);
//         setIsModalOpen(true);
//     };
//     const banUnbanUser = async (userId) => {
//         await axios.put(
//             `https://ygcapi.azurewebsites.net/api/user/${userId}`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             },
//         );

//         // Update the Users state directly
//         setUsers((prevUsers) =>
//             prevUsers.map((user) =>
//                 user.userId === userId ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : user,
//             ),
//         );
//     };

//     const checkInUser = async (phone) => {
//         try {
//             const response = await axios.post(
//                 `https://ygcapi.azurewebsites.net/api/attendance/${phone}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             if (response.status === 200) {
//                 alert('Check in successful');
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 409) {
//                 alert('User already checked in');
//             }
//         }
//     };

//     const checkOutUser = async (phone) => {
//         try {
//             const response = await axios.put(
//                 `https://ygcapi.azurewebsites.net/api/attendance/${phone}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             if (response.status === 200) {
//                 alert('Check out successful');
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 409) {
//                 alert('User already checked out');
//             }
//         }
//     };

//     const fetchUsers = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/user', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         const userData = response.data.filter((user) => user.role === 'STAFF');
//         setUsers(userData);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     return (
//         <div>
//             <h2>User page</h2>
//             <div>
//                 <Link to="/dashboard">Dashboard</Link>
//             </div>
//             <div>
//                 <form onSubmit={handleSearch}>
//                     <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search User" />
//                 </form>
//                 <table style={{ borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid black' }}>phone</th>
//                             <th style={{ border: '1px solid black' }}>email</th>
//                             <th style={{ border: '1px solid black' }}>full name</th>
//                             <th style={{ border: '1px solid black' }}>address</th>
//                             <th style={{ border: '1px solid black' }}>birthday</th>
//                             <th style={{ border: '1px solid black' }}>role</th>
//                             <th style={{ border: '1px solid black' }}>status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((User) => (
//                             <tr key={User.userId}>
//                                 <td style={{ border: '1px solid black' }}>{User.phone}</td>
//                                 <td style={{ border: '1px solid black' }}>{User.email}</td>
//                                 <td style={{ border: '1px solid black' }}>{User.fullName}</td>
//                                 <td style={{ border: '1px solid black' }}>{User.address}</td>
//                                 <td style={{ border: '1px solid black' }}>{User.dateOfBirth}</td>
//                                 <td style={{ border: '1px solid black' }}>{User.role}</td>
//                                 <td style={{ border: '1px solid black' }}>{User.status}</td>
//                                 <td>
//                                     <button onClick={() => banUnbanUser(User.userId)}>
//                                         {User.status === 'INACTIVE' ? 'Unban' : 'Ban'}
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => checkInUser(User.phone)}>Check In</button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => checkOutUser(User.phone)}>Check Out</button>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => fetchAttendance(User.phone)}>Check Attendance</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 {Array(Math.ceil(Users.length / itemsPerPage))
//                     .fill()
//                     .map((_, index) => (
//                         <button key={index} onClick={() => setCurrentPage(index + 1)}>
//                             {index + 1}
//                         </button>
//                     ))}
//             </div>
//             <ReactModal isOpen={isModalOpen} ariaHideApp={false} onRequestClose={() => setIsModalOpen(false)}>
//                 {attendanceData.length > 0 ? (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Date</th>
//                                 <th>Check In</th>
//                                 <th>Check Out</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {attendanceData
//                                 .slice((attendancePage - 1) * itemsPerPageModal, attendancePage * itemsPerPageModal)
//                                 .map((data, index) => (
//                                     <tr key={index}>
//                                         <td>{data.date}</td>
//                                         <td>{data.checkinTime}</td>
//                                         <td>{data.checkoutTime}</td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No attendance data available</p>
//                 )}
//                 <div>
//                     {Array(Math.ceil(attendanceData.length / itemsPerPageModal))
//                         .fill()
//                         .map((_, index) => (
//                             <button key={index} onClick={() => setAttendancePage(index + 1)}>
//                                 {index + 1}
//                             </button>
//                         ))}
//                 </div>
//             </ReactModal>
//         </div>
//     );
// }

// export default Staff;
