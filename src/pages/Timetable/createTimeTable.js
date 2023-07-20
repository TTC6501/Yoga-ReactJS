import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

function CreateTimeTable() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const token = useSelector((state) => state.user.token);
    const [form, setForm] = useState({
        // timetableId: 0,
        // slotNo: 0,
        time: '',
        classId: '',
        instructorId: '',
        roomId: '',
        startDate: '', // Add this
        endDate: '',
    });

    useEffect(() => {
        const fetchClasses = async () => {
            const url = 'https://ygcapi.azurewebsites.net/api/class';
            const headers = {
                Authorization: 'Bearer ' + token,
                accept: '*/*',
            };
            try {
                const response = await axios.get(url, { headers });
                setClasses(response.data);
                if (response.data.length > 0) {
                    setForm((prevForm) => ({ ...prevForm, classId: response.data[0].classId }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchClasses();
    }, []);

    useEffect(() => {
        const fetchClassDetails = async () => {
            // const token = 'Bearer ...';
            const url = `https://ygcapi.azurewebsites.net/api/class/${form.classId}`;
            const headers = {
                Authorization: 'Bearer ' + token,
                accept: '*/*',
            };
            try {
                const response = await axios.get(url, { headers });
                setForm((prevForm) => ({
                    ...prevForm,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        if (form.classId) {
            fetchClassDetails();
        }
    }, [form.classId]); // Listen for changes in form.classId

    useEffect(() => {
        const fetchInstructors = async () => {
            // const token =
            //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MjA2OTMyLCJleHAiOjE2ODkyOTMzMzJ9.gahZpRUlrgRy7m6w6gC4uqJcXR7iWrkJwN2DQmEbvvw';
            const url = 'https://ygcapi.azurewebsites.net/api/user';
            const headers = {
                Authorization: 'Bearer ' + token,
                accept: '*/*',
            };
            try {
                const response = await axios.get(url, { headers });
                const staff = response.data.filter((user) => user.role === 'STAFF');
                setInstructors(staff);
                if (staff.length > 0) {
                    setForm((prevForm) => ({ ...prevForm, instructorId: staff[0].userId }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchInstructors();
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            // const token =
            //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MjA2OTMyLCJleHAiOjE2ODkyOTMzMzJ9.gahZpRUlrgRy7m6w6gC4uqJcXR7iWrkJwN2DQmEbvvw';
            const url = 'https://ygcapi.azurewebsites.net/api/room';
            const headers = {
                Authorization: 'Bearer ' + token,
                accept: '*/*',
            };
            try {
                const response = await axios.get(url, { headers });
                setRooms(response.data);
                if (response.data.length > 0) {
                    setForm((prevForm) => ({ ...prevForm, roomId: response.data[0].roomId }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRooms();
    }, []);

    console.log(form);

    const formatDateTime = (date) => {
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const dd = String(date.getDate()).padStart(2, '0');
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        const token =
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MjA2OTMyLCJleHAiOjE2ODkyOTMzMzJ9.gahZpRUlrgRy7m6w6gC4uqJcXR7iWrkJwN2DQmEbvvw';
        return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
    };

    const navigateToClass = () => {
        navigate('/classList');
    };

    const fetchClassDetails = async (classId) => {
        const url = `https://ygcapi.azurewebsites.net/api/class/${classId}`;
        const headers = {
            Authorization: 'Bearer ' + token,
            accept: '*/*',
        };
        try {
            const response = await axios.get(url, { headers });
            setForm((prevForm) => ({
                ...prevForm,
                startDate: response.data.startDate,
                endDate: response.data.endDate,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = async (e) => {
        if (e.target.name === 'time') {
            let date = new Date(e.target.value);
            setForm({ ...form, [e.target.name]: formatDateTime(date) });
        } else if (e.target.name === 'classId') {
            setForm({ ...form, [e.target.name]: e.target.value, startDate: '', endDate: '' });
            await fetchClassDetails(e.target.value);
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const token =
        //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MjA2OTMyLCJleHAiOjE2ODkyOTMzMzJ9.gahZpRUlrgRy7m6w6gC4uqJcXR7iWrkJwN2DQmEbvvw';
        const url = 'https://ygcapi.azurewebsites.net/api/timetable';
        const headers = {
            Authorization: 'Bearer ' + token,
            accept: '*/*',
        };
        try {
            const response = await axios.post(url, form, { headers });
            console.log(response.data);
            navigate('/classList');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Time cannot be before or after startDate and endDate');
            }
        }
    };

    return (
        <div>
            <button onClick={navigateToClass}>Class</button>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Date:
                    <p>{form.startDate}</p>
                </label>
                <label>
                    End Date:
                    <p>{form.endDate}</p>
                </label>
                <label>{errorMessage && <p>{errorMessage}</p>}</label>
                <label>
                    Time:
                    <input type="datetime-local" name="time" onChange={handleChange} title="Enter the Time" />
                </label>
                <label>
                    Class:
                    <Select
                        name="classId"
                        options={classes.map((classItem) => ({ value: classItem.classId, label: classItem.className }))}
                        onChange={(selectedOption) =>
                            handleChange({ target: { name: 'classId', value: selectedOption.value } })
                        }
                    />
                </label>
                <label>
                    Instructor:
                    <Select
                        name="instructorId"
                        options={instructors.map((instructor) => ({
                            value: instructor.userId,
                            label: instructor.fullName,
                        }))}
                        onChange={(selectedOption) =>
                            handleChange({ target: { name: 'instructorId', value: selectedOption.value } })
                        }
                    />
                </label>
                <label>
                    Room:
                    <Select
                        name="roomId"
                        options={rooms.map((room) => ({ value: room.roomId, label: room.name }))}
                        onChange={(selectedOption) =>
                            handleChange({ target: { name: 'roomId', value: selectedOption.value } })
                        }
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateTimeTable;
