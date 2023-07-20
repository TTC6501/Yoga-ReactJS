import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Select from 'react-select';
import './Timetable.css';

function TimeTableList() {
    // const timetableClassURL = 'http://localhost:8080/api/timetable/class';
    // const timetableURL = 'http://localhost:8080/api/timetable';
    // const roomURL = 'http://localhost:8080/api/room';
    // const roomURL = 'http://localhost:8080/api/class';
    // const userURL = 'http://localhost:8080/api/user';
    const timetableClassURL = 'https://ygcapi.azurewebsites.net/api/timetable/class';
    const timetableURL = 'https://ygcapi.azurewebsites.net/api/timetable';
    const roomURL = 'https://ygcapi.azurewebsites.net/api/room';
    const classURL = 'https://ygcapi.azurewebsites.net/api/class'
    const userURL = 'https://ygcapi.azurewebsites.net/api/user';
    
    let navigate = useNavigate();
    const { classId } = useParams();
    const [Classs, setClasss] = useState([]);
    const [staff, setStaff] = useState([]);
    const [staffLoading, setStaffLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [timeTable, setTimeTable] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const token = useSelector((state) => state.user.token);

    const openModalWithItem = (item) => {
        setCurrentItem(item);
        setModalIsOpen(true);
    };

    useEffect(() => {
        const fetchTimeTable = async () => {
            const response = await axios.get(timetableClassURL + '/' + classId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*',
                },
            });
            setTimeTable(Array.isArray(response.data) ? response.data : []);
        };

        fetchTimeTable();
    }, [classId]);

    const navigateToClass = () => {
        navigate('/classList');
    };

    const fetchTimeTableById = async (timetableId) => {
        const response = await axios.get(timetableURL + '/' + timetableId, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            },
        });
        setTimeTable(Array.isArray(response.data) ? response.data : []);
    };

    const deleteTimetable = async (timetableId) => {
        try {
            const response = await axios.delete(timetableURL + '/' + timetableId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*',
                },
            });
            if (response.status === 200) {
                alert('Slot deleted successfully');
                fetchTimeTable();
            } else if (response.status === 403) {
                alert('slot is on use!!!');
            } // Refresh the timetable of the class after deletion
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the slot');
        }
    };

    const fetchClassDetails = async () => {
        const response = await axios.get(classURL + '/' + classId, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            },
        });
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
    };

    const fetchClasss = async () => {
        const response = await axios.get(classURL, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setClasss(response.data);
    };

    const fetchRooms = async () => {
        const response = await axios.get(roomURL, {
            headers: {
                Authorization: 'Bearer your_token_here',
                'Content-Type': 'application/json',
            },
        });
        setRooms(response.data);
    };

    const fetchStaff = async () => {
        const response = await axios.get(userURL, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const staffData = response.data.filter((user) => user.role === 'STAFF');
        setStaff(staffData);
        setStaffLoading(false);
    };

    const fetchTimeTable = async () => {
        const response = await axios.get(timetableClassURL + '/' + classId, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            },
        });
        setTimeTable(Array.isArray(response.data) ? response.data : []);
    };

    useEffect(() => {
        fetchTimeTable();
        fetchClassDetails();
    }, [classId]);

    const updateTimetable = async (event) => {
        event.preventDefault();
        const newTime = event.target.elements.time.value;
        const formattedTime = new Date(newTime).toISOString().replace('T', ' ').substring(0, 19);
        // const classId = useParams().classId;
        const instructorId = event.target.elements.instructorId.value;
        const roomId = event.target.elements.roomId.value;
        try {
            const response = await axios.put(
                timetableURL,
                {
                    timetableId: currentItem.timetableId,
                    slotNo: currentItem.slotNo,
                    time: formattedTime,
                    classId: classId,
                    instructorId: instructorId,
                    roomId: roomId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            setTimeTable(Array.isArray(response.data) ? response.data : []);
            setModalIsOpen(false);
            fetchTimeTable();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(<p style={{ color: 'red' }}>Time cannot be before or after startDate and endDate</p>);
            }
        }
    };

    useEffect(() => {
        fetchClasss();
        fetchStaff();
        fetchRooms();
    }, []);
    return (
        <div className="container">
            <h2 className="title">Timetable</h2>
            <div>
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
                    onClick={navigateToClass}
                >
                    Class
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Class Name</th>
                            <th style={{ border: '1px solid black' }}>Slot</th>
                            <th style={{ border: '1px solid black' }}>Time</th>
                            <th style={{ border: '1px solid black' }}>Instructor</th>
                            <th style={{ border: '1px solid black' }}>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeTable.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black' }}>{item.ofClass.className}</td>
                                <td style={{ border: '1px solid black' }}>{item.slotNo}</td>
                                <td style={{ border: '1px solid black' }}>
                                    {new Date(item.time).toISOString().substring(0, 19).replace('T', ' ')}
                                </td>
                                <td style={{ border: '1px solid black' }}>{item.instructor.fullName}</td>
                                <td style={{ border: '1px solid black' }}>{item.room.name}</td>
                                <td style={{ border: 'none' }}>
                                    <button className="update-button" onClick={() => openModalWithItem(item)}>
                                        Update
                                    </button>
                                </td>
                                <td style={{ border: 'none' }}>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this slot?')) {
                                                deleteTimetable(item.timetableId);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                                {/* <td>{item.subject}</td> */}
                                {/* Add more cells if needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <form onSubmit={updateTimetable}>
                    {/* <label>
                        
                        <input
                            name="timetableId"
                            type="number"
                            placeholder="Timetable ID"
                            required
                            defaultValue={currentItem?.timetableId}
                        />
                    </label>

                    <input
                        name="slotNo"
                        type="number"
                        placeholder="Slot Number"
                        required
                        defaultValue={currentItem?.slotNo}
                    /> */}
                    <label>
                        Time
                        <input
                            name="time"
                            type="datetime-local"
                            placeholder="Time"
                            required
                            defaultValue={currentItem ? new Date(currentItem.time).toISOString().substring(0, 16) : ''}
                        />
                    </label>
                    <label>
                        Class ID
                        <select name="classId" required defaultValue={currentItem?.ofClass.classId}>
                            {Classs.map((classItem) => (
                                <option key={classItem.classId} value={classItem.classId}>
                                    {classItem.classId}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Instructor
                        <Select
                            name="instructorId"
                            options={staff.map((staffItem) => ({ value: staffItem.userId, label: staffItem.fullName }))}
                            defaultValue={{
                                value: currentItem?.instructor.userId,
                                label: currentItem?.instructor.fullName,
                            }}
                        />
                    </label>

                    <label>
                        Room ID
                        <Select
                            name="roomId"
                            options={rooms.map((roomItem) => ({ value: roomItem.roomId, label: roomItem.name }))}
                            defaultValue={{ value: currentItem?.room.roomId, label: currentItem?.room.name }}
                        />
                    </label>

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
                        type="submit"
                    >
                        Update Timetable
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default TimeTableList;

// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';
// import Select from 'react-select';

// function TimeTableList() {
//     let navigate = useNavigate();
//     const token = useSelector((state) => state.user.token);
//     const user = useSelector((state) => state.user.user);
//     const staffRole = 'STAFF';
//     const { classId } = useParams();
//     const [Classs, setClasss] = useState([]);
//     const [staff, setStaff] = useState([]);
//     const [staffLoading, setStaffLoading] = useState(true);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [timeTable, setTimeTable] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [currentItem, setCurrentItem] = useState(null);
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     const openModalWithItem = (item) => {
//         setCurrentItem(item);
//         setModalIsOpen(true);
//     };

//     useEffect(() => {
//         const fetchTimeTable = async () => {
//             const response = await axios.get(`https://ygcapi.azurewebsites.net/api/timetable/class/${classId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     Accept: '*/*',
//                 },
//             });
//             setTimeTable(Array.isArray(response.data) ? response.data : []);
//         };

//         fetchTimeTable();
//     }, [classId]);

//     const navigateToClass = () => {
//         navigate('/classList');
//     };

//     const fetchTimeTableById = async (timetableId) => {
//         const response = await axios.get(`https://ygcapi.azurewebsites.net/api/timetable/${timetableId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: '*/*',
//             },
//         });
//         setTimeTable(Array.isArray(response.data) ? response.data : []);
//     };

//     const deleteTimetable = async (timetableId) => {
//         try {
//             const response = await axios.delete(`https://ygcapi.azurewebsites.net/api/timetable/${timetableId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     Accept: '*/*',
//                 },
//             });
//             if (response.status === 200) {
//                 alert('Slot deleted successfully');
//                 fetchTimeTable();
//             } else if (response.status === 403) {
//                 alert('slot is on use!!!');
//             } // Refresh the timetable of the class after deletion
//         } catch (error) {
//             console.error(error);
//             alert('An error occurred while deleting the slot');
//         }
//     };

//     const fetchClassDetails = async () => {
//         const response = await axios.get(`https://ygcapi.azurewebsites.net/api/class/${classId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: '*/*',
//             },
//         });
//         setStartDate(response.data.startDate);
//         setEndDate(response.data.endDate);
//     };

//     const fetchClasss = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/class', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         setClasss(response.data);
//     };

//     const fetchRooms = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/room', {
//             headers: {
//                 Authorization: 'Bearer your_token_here',
//                 'Content-Type': 'application/json',
//             },
//         });
//         setRooms(response.data);
//     };

//     const fetchStaff = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/user', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         const staffData = response.data.filter((user) => user.role === 'STAFF');
//         setStaff(staffData);
//         setStaffLoading(false);
//     };

//     const fetchTimeTable = async () => {
//         const response = await axios.get(`https://ygcapi.azurewebsites.net/api/timetable/class/${classId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: '*/*',
//             },
//         });
//         setTimeTable(Array.isArray(response.data) ? response.data : []);
//     };

//     useEffect(() => {
//         fetchTimeTable();
//         fetchClassDetails();
//     }, [classId]);

//     const updateTimetable = async (event) => {
//         event.preventDefault();
//         const newTime = event.target.elements.time.value;
//         const formattedTime = new Date(newTime).toISOString().replace('T', ' ').substring(0, 19);
//         // const classId = useParams().classId;
//         const instructorId = event.target.elements.instructorId.value;
//         const roomId = event.target.elements.roomId.value;
//         try {
//             const response = await axios.put(
//                 'https://ygcapi.azurewebsites.net/api/timetable',
//                 {
//                     timetableId: currentItem.timetableId,
//                     slotNo: currentItem.slotNo,
//                     time: formattedTime,
//                     classId: classId,
//                     instructorId: instructorId,
//                     roomId: roomId,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             setTimeTable(Array.isArray(response.data) ? response.data : []);
//             setModalIsOpen(false);
//             fetchTimeTable();
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 setErrorMessage('Time cannot be before or after startDate and endDate');
//             }
//         }
//     };

//     useEffect(() => {
//         fetchClasss();
//         if (user.role !== staffRole) {
//             fetchStaff();
//         }
//         fetchRooms();
//     }, []);
//     return (
//         <div>
//             <div>
//                 <button className='btn' onClick={navigateToClass} style={{
//                     margin: 20
//                 }}>Class</button>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid black' }}>Class Name</th>
//                             <th style={{ border: '1px solid black' }}>Slot</th>
//                             <th style={{ border: '1px solid black' }}>Time</th>
//                             <th style={{ border: '1px solid black' }}>Instructor</th>
//                             <th style={{ border: '1px solid black' }}>Room</th>
//                             {/* <th>Subject</th> */}
//                             {/* Add more headers if needed */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {timeTable.map((item, index) => (
//                             <tr key={index}>
//                                 <td style={{ border: '1px solid black' }}>{item.ofClass.className}</td>
//                                 <td style={{ border: '1px solid black' }}>{item.slotNo}</td>
//                                 <td style={{ border: '1px solid black' }}>
//                                     {new Date(item.time).toISOString().substring(0, 19).replace('T', ' ')}
//                                 </td>
//                                 <td style={{ border: '1px solid black' }}>{item.instructor.fullName}</td>
//                                 <td style={{ border: '1px solid black' }}>{item.room.name}</td>

//                                 {
//                                     user?.role !== staffRole && (
//                                         <>
//                                             <td>
//                                                 <button onClick={() => openModalWithItem(item)}>Update</button>
//                                             </td>
//                                             <td>
//                                                 <button
//                                                     onClick={() => {
//                                                         if (window.confirm('Are you sure you want to delete this course?')) {
//                                                             deleteTimetable(item.timetableId);
//                                                         }
//                                                     }}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                             {/* <td>{item.subject}</td> */}
//                                             {/* Add more cells if needed */}
//                                         </>
//                                     )
//                                 }

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
//                 <div>
//                     <p>Start Date: {startDate}</p>
//                     <p>End Date: {endDate}</p>
//                     {errorMessage && <p>{errorMessage}</p>}
//                 </div>
//                 <form onSubmit={updateTimetable}>
//                     {/* <label>
                        
//                         <input
//                             name="timetableId"
//                             type="number"
//                             placeholder="Timetable ID"
//                             required
//                             defaultValue={currentItem?.timetableId}
//                         />
//                     </label>

//                     <input
//                         name="slotNo"
//                         type="number"
//                         placeholder="Slot Number"
//                         required
//                         defaultValue={currentItem?.slotNo}
//                     /> */}
//                     <label>
//                         Time
//                         <input
//                             name="time"
//                             type="datetime-local"
//                             placeholder="Time"
//                             required
//                             defaultValue={currentItem ? new Date(currentItem.time).toISOString().substring(0, 16) : ''}
//                         />
//                     </label>
//                     <label>
//                         Class ID
//                         <select name="classId" required defaultValue={currentItem?.ofClass.classId}>
//                             {Classs.map((classItem) => (
//                                 <option key={classItem.classId} value={classItem.classId}>
//                                     {classItem.classId}
//                                 </option>
//                             ))}
//                         </select>
//                     </label>
//                     <label>
//                         Instructor
//                         <Select
//                             name="instructorId"
//                             options={staff.map((staffItem) => ({ value: staffItem.userId, label: staffItem.fullName }))}
//                             defaultValue={{
//                                 value: currentItem?.instructor.userId,
//                                 label: currentItem?.instructor.fullName,
//                             }}
//                         />
//                     </label>

//                     <label>
//                         Room ID
//                         <Select
//                             name="roomId"
//                             options={rooms.map((roomItem) => ({ value: roomItem.roomId, label: roomItem.name }))}
//                             defaultValue={{ value: currentItem?.room.roomId, label: currentItem?.room.name }}
//                         />
//                     </label>

//                     <button type="submit">Update Timetable</button>
//                 </form>
//             </Modal>
//         </div>
//     );
// }

// export default TimeTableList;
