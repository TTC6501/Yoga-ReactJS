import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import { useState } from 'react';
import { useSelector } from 'react-redux';

function TimeTableList() {
    let navigate = useNavigate();
    const { classId } = useParams();
    const [Classs, setClasss] = useState([]);
    const [staff, setStaff] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [timeTable, setTimeTable] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const token = useSelector(state => state.user.token);


    const openModalWithItem = (item) => {
        setCurrentItem(item);
        setModalIsOpen(true);
    };

    useEffect(() => {
        const fetchTimeTable = async () => {
            const response = await axios.get(`https://ygcapi.azurewebsites.net/api/timetable/class/${classId}`, {
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
        const response = await axios.get(`https://ygcapi.azurewebsites.net/api/timetable/${timetableId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            },
        });
        setTimeTable(Array.isArray(response.data) ? response.data : []);
    };

    const deleteTimetable = async (timetableId) => {
        try {
            const response = await axios.delete(`https://ygcapi.azurewebsites.net/api/timetable/${timetableId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: '*/*',
                },
            });
            if (response.status === 200) {
                alert('Slot deleted successfully');
                fetchTimeTable();
            } else if (response.status === 403){
                alert('slot is on use!!!');
            } // Refresh the timetable of the class after deletion
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the slot');
        }
    };

    const fetchClassDetails = async () => {
        const response = await axios.get(`https://ygcapi.azurewebsites.net/api/class/${classId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
            },
        });
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
    };

    const fetchClasss = async () => {
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/class', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setClasss(response.data);
    };

    const fetchRooms = async () => {
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/room', {
            headers: {
                Authorization: 'Bearer your_token_here',
                'Content-Type': 'application/json',
            },
        });
        setRooms(response.data);
    };

    const fetchStaff = async () => {
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const staffData = response.data.filter((user) => user.role === 'STAFF');
        setStaff(staffData);
    };

    const fetchTimeTable = async () => {
        const response = await axios.get(`https://ygcapi.azurewebsites.net/api/timetable/class/${classId}`, {
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
                'https://ygcapi.azurewebsites.net/api/timetable',
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
                setErrorMessage('Time cannot be before or after startDate and endDate');
            }
        }
    };

    useEffect(() => {
        fetchClasss();
        fetchStaff();
        fetchRooms();
    }, []);
    return (
        <div>
            <div>
                <button onClick={navigateToClass}>Class</button>
                <table>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Class Name</th>
                            <th style={{ border: '1px solid black' }}>Slot</th>
                            <th style={{ border: '1px solid black' }}>Time</th>
                            <th style={{ border: '1px solid black' }}>Instructor</th>
                            <th style={{ border: '1px solid black' }}>Room</th>
                            {/* <th>Subject</th> */}
                            {/* Add more headers if needed */}
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
                                <td>
                                    <button onClick={() => openModalWithItem(item)}>Update</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this course?')) {
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
                    {/* <label>
                        Class ID
                        <select name="classId" required defaultValue={currentItem?.ofClass.classId}>
                            {Classs.map((classItem) => (
                                <option key={classItem.classId} value={classItem.classId}>
                                    {classItem.classId}
                                </option>
                            ))}
                        </select>
                    </label> */}
                    <label>
                        Instructor ID
                        <select name="instructorId" required defaultValue={currentItem?.instructor.userId}>
                            {staff.map((staffItem) => (
                                <option key={staffItem.userId} value={staffItem.userId}>
                                    {staffItem.fullName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Room ID
                        <select name="roomId" required defaultValue={currentItem?.room.roomId}>
                            {rooms.map((roomItem) => (
                                <option key={roomItem.roomId} value={roomItem.roomId}>
                                    {roomItem.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">Update Timetable</button>
                </form>
            </Modal>
        </div>
    );
}

export default TimeTableList;
