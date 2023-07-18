import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

function Class() {
    const token = useSelector(state => state.user.token);

    let navigate = useNavigate();
    const [Classs, setClasss] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [staff, setStaff] = useState([]);
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // const handleSearch = (e) => {
    //     const term = e.target.value;
    //     setSearchTerm(term);
    //     setCurrentPage(1);
    //     if (term === '') {
    //         fetchClasss();
    //     } else {
    //         const filteredClasss = Classs.filter(
    //             (Class) => Class.className && Class.className.toLowerCase().includes(term.toLowerCase()),
    //         );
    //         setClasss(filteredClasss);
    //     }
    // };

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

    const fetchCourses = async () => {
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/course', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setCourses(response.data);
    };

    const navigateToCreateClass = () => {
        navigate('/createClass');
    };
    const navigateToCreateTime = () => {
        navigate('/createTimeTable');
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

    const updateClass = async (classId, className, startDate, endDate, capacity, instructorPhone, courseId) => {
        try {
            const response = await axios.put(
                'https://ygcapi.azurewebsites.net/api/class',
                {
                    classId,
                    className,
                    startDate,
                    endDate,
                    capacity,
                    instructorPhone,
                    courseId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (response.status === 200) {
                alert('Class updated successfully');
                setClasss(Classs.map((Class) => (Class.classId === classId ? response.data : Class)));
                setModalIsOpen(false);
            } else {
                alert('Failed to update Class');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the Class');
        }
    };

    const deleteClass = async (classId) => {
        try {
            const response = await axios.delete(`https://ygcapi.azurewebsites.net/api/class/${classId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                alert('Class deleted successfully');
                setClasss(Classs.filter((Class) => Class.classId !== classId));
            } else {
                alert('Failed to delete Class');
            }
        } catch (error) {
            console.error(error);
            alert('Class is on use!!!');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchClasss();
        fetchStaff();
        fetchCourses();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleTimeTable = (classId) => {
        navigate(`/timeTableList/${classId}`);
    };

    const totalPages = Math.ceil(Classs.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <h2>Class page</h2>
            <div>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div>
                <button onClick={navigateToCreateClass}>Create class</button>
            </div>
            <div>
                <button onClick={navigateToCreateTime}>Create timetable</button>
            </div>
            <div>
                <form>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                    />
                </form>
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Class name</th>
                            <th style={{ border: '1px solid black' }}>start</th>
                            <th style={{ border: '1px solid black' }}>end</th>
                            <th style={{ border: '1px solid black' }}>capacity</th>
                            <th style={{ border: '1px solid black' }}>instructor</th>
                            <th style={{ border: '1px solid black' }}>phone</th>
                            <th style={{ border: '1px solid black' }}>Class</th>
                            <th style={{ border: '1px solid black' }}>Update</th>
                            <th style={{ border: '1px solid black' }}>Delete</th>
                            <th style={{ border: '1px solid black' }}>Timetable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Classs.filter((Class) => Class.className.toLowerCase().includes(searchTerm.toLowerCase()))
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((Class) => (
                                <tr key={Class.classId}>
                                    <td style={{ border: '1px solid black' }}>{Class.className}</td>
                                    <td style={{ border: '1px solid black' }}>{formatDate(Class.startDate)}</td>
                                    <td style={{ border: '1px solid black' }}>{formatDate(Class.endDate)}</td>
                                    <td style={{ border: '1px solid black' }}>{Class.capacity}</td>
                                    <td style={{ border: '1px solid black' }}>{Class.instructor.fullName}</td>
                                    <td style={{ border: '1px solid black' }}>{Class.instructor.phone}</td>
                                    <td style={{ border: '1px solid black' }}>{Class.course.name}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setSelectedClass(Class);
                                                setModalIsOpen(true);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this course?')) {
                                                    deleteClass(Class.classId);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleTimeTable(Class.classId)}>Slot</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div>
                {pageNumbers.map((number) => (
                    <button key={number} disabled={currentPage === number} onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                {selectedClass && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateClass(
                                selectedClass.classId,
                                e.target.className.value,
                                e.target.startDate.value,
                                e.target.endDate.value,
                                e.target.capacity.value,
                                e.target.instructorPhone.value,
                                e.target.courseId.value,
                            );
                        }}
                    >
                        <input type="text" name="className" defaultValue={selectedClass.className} />
                        <input type="date" name="startDate" defaultValue={formatDate(selectedClass.startDate)} />
                        <input type="date" name="endDate" defaultValue={formatDate(selectedClass.endDate)} />
                        <input type="number" name="capacity" defaultValue={selectedClass.capacity} />
                        <select name="instructorPhone" defaultValue={selectedClass.instructor.phone}>
                            {staff.map((user, index) => (
                                <option key={index} value={user.phone}>
                                    {user.phone}
                                </option>
                            ))}
                        </select>
                        <select name="courseId" defaultValue={selectedClass.course.courseId}>
                            {courses.map((course, index) => (
                                <option key={index} value={course.courseId}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Update Class</button>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default Class;
