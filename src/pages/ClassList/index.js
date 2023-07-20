import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import './ClassList.css';
import Select from 'react-select';

function Class() {
    const token = useSelector((state) => state.user.token);
    // const classURL = 'http://localhost:8080/api/user';
    // const courseURL = 'http://localhost:8080/api/course';
    // const userURL = 'http://localhost:8080/api/user'
    const classURL = 'https://ygcapi.azurewebsites.net/api/class';
    const courseURL = 'https://ygcapi.azurewebsites.net/api/course';
    const userURL = 'https://ygcapi.azurewebsites.net/api/user';

    let navigate = useNavigate();
    const [Classs, setClasss] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [staff, setStaff] = useState([]);
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const itemsPerPage = 6;

    const fetchStaff = async () => {
        const response = await axios.get(userURL, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const staffData = response.data.filter((user) => user.role === 'STAFF');
        setStaff(staffData);
    };

    const fetchCourses = async () => {
        const response = await axios.get(courseURL, {
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
        const response = await axios.get(classURL, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setClasss(response.data);
    };

    const updateClass = async (classId, classTitle, startDate, endDate, capacity, instructorPhone, courseId) => {
        try {
            const className = classTitle;
            instructorPhone = instructorPhone || selectedClass.instructor.phone;
            courseId = courseId || selectedClass.course.courseId;
            const response = await axios.put(
                classURL,
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
                alert('Class update success!')
                setModalIsOpen(false);
                fetchClasss();
            }
            // rest of your code
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(<div><p style={{ color: 'red' }}>Start date can not after end date and end date can not before start date</p></div>);
            }
        }
    };

    const deleteClass = async (classId) => {
        try {
            const response = await axios.delete(classURL + '/' + classId, {
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
        <div className="container">
            <h2 className="title">Class page</h2>
            <div>
                <Link className="dashboard-link" to="/dashboard">
                    Dashboard
                </Link>
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
                    onClick={navigateToCreateClass}
                >
                    Create Class
                </button>
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
                    onClick={navigateToCreateTime}
                >
                    Create timetable
                </button>
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
                <table className="table" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Class name</th>
                            <th style={{ border: '1px solid black' }}>start</th>
                            <th style={{ border: '1px solid black' }}>end</th>
                            <th style={{ border: '1px solid black' }}>capacity</th>
                            <th style={{ border: '1px solid black' }}>instructor</th>
                            <th style={{ border: '1px solid black' }}>phone</th>
                            <th style={{ border: '1px solid black' }}>Course</th>
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
                                    <td style={{ border: 'none' }}>
                                        <button
                                            className="update-button"
                                            onClick={() => {
                                                setSelectedClass(Class);
                                                setModalIsOpen(true);
                                            }}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td style={{ border: 'none' }}>
                                        <button
                                            className="delete-button"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this course?')) {
                                                    deleteClass(Class.classId);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td style={{ border: 'none' }}>
                                        <button className="slot-button" onClick={() => handleTimeTable(Class.classId)}>
                                            Slot
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
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
                                e.target.elements.classTitle.value,
                                e.target.startDate.value,
                                e.target.endDate.value,
                                e.target.capacity.value,
                                e.target.instructorPhone.value,
                                e.target.courseId.value,
                            );
                        }}
                    >
                        <label>
                            Class name
                            <input type="text" name="classTitle" defaultValue={selectedClass.className} />
                        </label>
                        <label>
                            Start date
                            <input type="date" name="startDate" defaultValue={formatDate(selectedClass.startDate)} />
                        </label>
                        <label>
                            End date
                            <input type="date" name="endDate" defaultValue={formatDate(selectedClass.endDate)} />
                        </label>
                        {errorMessage && <p>{errorMessage}</p>}
                        <label>
                            Capacity
                            <input type="number" name="capacity" defaultValue={selectedClass.capacity} />
                        </label>

                        <label>
                            Instructor phone
                            <Select
                                defaultValue={{
                                    value: selectedClass?.instructor.phone,
                                    label: selectedClass?.instructor.fullName,
                                }}
                                options={staff.map((user) => ({ value: user.phone, label: user.fullName }))}
                                name="instructorPhone"
                            />
                        </label>
                        <label>
                            Course
                            <Select
                                defaultValue={{
                                    value: selectedClass?.course.courseId,
                                    label: selectedClass?.course.name,
                                }}
                                options={courses.map((course) => ({ value: course.courseId, label: course.name }))}
                                name="courseId"
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
                            Update Class
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default Class;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';
// import { useSelector } from 'react-redux';

// function Class() {
//     const token = useSelector(state => state.user.token);
//     const user = useSelector(state => state.user.user);
//     const staffRole = 'STAFF';
//     let navigate = useNavigate();
//     const [Classs, setClasss] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [staff, setStaff] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 6;

//     // const handleSearch = (e) => {
//     //     const term = e.target.value;
//     //     setSearchTerm(term);
//     //     setCurrentPage(1);
//     //     if (term === '') {
//     //         fetchClasss();
//     //     } else {
//     //         const filteredClasss = Classs.filter(
//     //             (Class) => Class.className && Class.className.toLowerCase().includes(term.toLowerCase()),
//     //         );
//     //         setClasss(filteredClasss);
//     //     }
//     // };

//     const fetchStaff = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/user', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         const staffData = response.data.filter((user) => user.role === 'STAFF');
//         setStaff(staffData);
//     };

//     const fetchCourses = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/course', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         setCourses(response.data);
//     };

//     const navigateToCreateClass = () => {
//         navigate('/createClass');
//     };
//     const navigateToCreateTime = () => {
//         navigate('/createTimeTable');
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

//     const updateClass = async (classId, className, startDate, endDate, capacity, instructorPhone, courseId) => {
//         try {
//             const response = await axios.put(
//                 'https://ygcapi.azurewebsites.net/api/class',
//                 {
//                     classId,
//                     className,
//                     startDate,
//                     endDate,
//                     capacity,
//                     instructorPhone,
//                     courseId,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             if (response.status === 200) {
//                 alert('Class updated successfully');
//                 setClasss(Classs.map((Class) => (Class.classId === classId ? response.data : Class)));
//                 setModalIsOpen(false);
//             } else {
//                 alert('Failed to update Class');
//             }
//         } catch (error) {
//             console.error(error);
//             alert('An error occurred while updating the Class');
//         }
//     };

//     const deleteClass = async (classId) => {
//         try {
//             const response = await axios.delete(`https://ygcapi.azurewebsites.net/api/class/${classId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (response.status === 200) {
//                 alert('Class deleted successfully');
//                 setClasss(Classs.filter((Class) => Class.classId !== classId));
//             } else {
//                 alert('Failed to delete Class');
//             }
//         } catch (error) {
//             console.error(error);
//             alert('Class is on use!!!');
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = ('0' + (date.getMonth() + 1)).slice(-2);
//         const day = ('0' + date.getDate()).slice(-2);

//         return `${year}-${month}-${day}`;
//     };

//     useEffect(() => {
//         fetchClasss();
//         if (user.role === 'ADMIN') {
//             fetchStaff();
//         }
//         fetchCourses();
//     }, []);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchTerm]);

//     const handleTimeTable = (classId) => {
//         navigate(`/timeTableList/${classId}`);
//     };

//     const totalPages = Math.ceil(Classs.length / itemsPerPage);
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//     return (
//         <div>
//             <h2>Class page</h2>
//             {
//                 user.role !== staffRole && (
//                     <>
//                         <div>
//                             <Link to="/dashboard">Dashboard</Link>
//                         </div>
//                         <div>
//                             <button onClick={navigateToCreateClass}>Create class</button>
//                         </div>
//                         <div>
//                             <button onClick={navigateToCreateTime}>Create timetable</button>
//                         </div>
//                     </>
//                 )
//             }

//             <div>
//                 <form>
//                     <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Search..."
//                     />
//                 </form>
//                 <table style={{ borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid black' }}>Class name</th>
//                             <th style={{ border: '1px solid black' }}>start</th>
//                             <th style={{ border: '1px solid black' }}>end</th>
//                             <th style={{ border: '1px solid black' }}>capacity</th>
//                             <th style={{ border: '1px solid black' }}>instructor</th>
//                             <th style={{ border: '1px solid black' }}>phone</th>
//                             <th style={{ border: '1px solid black' }}>Course</th>
//                             {
//                                 user.role !== staffRole && (
//                                     <>
//                                         <th style={{ border: '1px solid black' }}>Update</th>
//                                         <th style={{ border: '1px solid black' }}>Delete</th>
//                                     </>
//                                 )
//                             }

//                             <th style={{ border: '1px solid black' }}>Timetable</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Classs.filter((Class) => Class.className.toLowerCase().includes(searchTerm.toLowerCase()))
//                             .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//                             .map((Class) => (
//                                 <tr key={Class.classId}>
//                                     <td style={{ border: '1px solid black' }}>{Class.className}</td>
//                                     <td style={{ border: '1px solid black' }}>{formatDate(Class.startDate)}</td>
//                                     <td style={{ border: '1px solid black' }}>{formatDate(Class.endDate)}</td>
//                                     <td style={{ border: '1px solid black' }}>{Class.capacity}</td>
//                                     <td style={{ border: '1px solid black' }}>{Class.instructor.fullName}</td>
//                                     <td style={{ border: '1px solid black' }}>{Class.instructor.phone}</td>
//                                     <td style={{ border: '1px solid black' }}>{Class.course.name}</td>
//                                     {
//                                         user.role !== staffRole && (
//                                             <>
//                                                 <td>
//                                                     <button
//                                                         onClick={() => {
//                                                             setSelectedClass(Class);
//                                                             setModalIsOpen(true);
//                                                         }}
//                                                     >
//                                                         Update
//                                                     </button>
//                                                 </td>
//                                                 <td>
//                                                     <button
//                                                         onClick={() => {
//                                                             if (window.confirm('Are you sure you want to delete this course?')) {
//                                                                 deleteClass(Class.classId);
//                                                             }
//                                                         }}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </td>
//                                             </>
//                                         )
//                                     }
//                                     <td>
//                                         <button className='btn' onClick={() => handleTimeTable(Class.classId)}>Slot</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 {pageNumbers.map((number) => (
//                     <button key={number} disabled={currentPage === number} onClick={() => setCurrentPage(number)}>
//                         {number}
//                     </button>
//                 ))}
//             </div>
//             <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
//                 {selectedClass && (
//                     <form
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             updateClass(
//                                 selectedClass.classId,
//                                 e.target.className.value,
//                                 e.target.startDate.value,
//                                 e.target.endDate.value,
//                                 e.target.capacity.value,
//                                 e.target.instructorPhone.value,
//                                 e.target.courseId.value,
//                             );
//                         }}
//                     >
//                         <input type="text" name="className" defaultValue={selectedClass.className} />
//                         <input type="date" name="startDate" defaultValue={formatDate(selectedClass.startDate)} />
//                         <input type="date" name="endDate" defaultValue={formatDate(selectedClass.endDate)} />
//                         <input type="number" name="capacity" defaultValue={selectedClass.capacity} />
//                         <select name="instructorPhone" defaultValue={selectedClass.instructor.phone}>
//                             {staff.map((user, index) => (
//                                 <option key={index} value={user.phone}>
//                                     {user.phone}
//                                 </option>
//                             ))}
//                         </select>
//                         <select name="courseId" defaultValue={selectedClass.course.courseId}>
//                             {courses.map((course, index) => (
//                                 <option key={index} value={course.courseId}>
//                                     {course.name}
//                                 </option>
//                             ))}
//                         </select>
//                         <button type="submit">Update Class</button>
//                     </form>
//                 )}
//             </Modal>
//         </div>
//     );
// }

// export default Class;
