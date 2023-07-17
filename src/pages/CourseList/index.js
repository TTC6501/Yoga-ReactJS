import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

function Course() {
    const token = useSelector(state => state.user.token);

    let navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setCurrentPage(1);
        if (term === '') {
            fetchCourses();
        } else {
            const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(term.toLowerCase()));
            setCourses(filteredCourses);
        }
    };

    const navigateToCreateCourse = () => {
        navigate('/createCourse');
    };

    const fetchCourses = async () => {
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/course');
        setCourses(response.data);
    };

    const updateCourse = async (courseId, name, description, price) => {
        try {
            const response = await axios.put(
                'https://ygcapi.azurewebsites.net/api/course',
                {
                    courseId,
                    name,
                    description,
                    price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (response.status === 200) {
                alert('Course updated successfully');
                fetchCourses();
                setModalIsOpen(false);
            } else {
                alert('Failed to update course');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the course');
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`https://ygcapi.azurewebsites.net/api/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                alert('Course deleted successfully');
                fetchCourses();
            } else {
                alert('Failed to delete course');
            }
        } catch (error) {
            console.error(error);
            alert('Course is on use!!!');
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Course page</h2>
            <div>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div>
                <button onClick={navigateToCreateCourse}>Create</button>
            </div>
            <div>
                <form onSubmit={handleSearch}>
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search course" />
                </form>
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Course Name</th>
                            <th style={{ border: '1px solid black' }}>Description</th>
                            <th style={{ border: '1px solid black' }}>Price</th>
                            <th style={{ border: '1px solid black' }}>Update</th>
                            <th style={{ border: '1px solid black' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course) => (
                            <tr key={course.courseId}>
                                <td style={{ border: '1px solid black' }}>{course.name}</td>
                                <td style={{ border: '1px solid black' }}>{course.description}</td>
                                <td style={{ border: '1px solid black' }}>{course.price}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedCourse(course);
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
                                                deleteCourse(course.courseId);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {Array(Math.ceil(courses.length / itemsPerPage))
                    .fill()
                    .map((_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                {' '}
                {selectedCourse && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateCourse(
                                selectedCourse.courseId,
                                e.target.name.value,
                                e.target.description.value,
                                e.target.price.value,
                            );
                        }}
                    >
                        <label>
                            Name:
                            <input name="name" defaultValue={selectedCourse.name} required />
                        </label>
                        <label>
                            Description:
                            <input name="description" defaultValue={selectedCourse.description} required />
                        </label>
                        <label>
                            Price:
                            <input name="price" type="number" defaultValue={selectedCourse.price} required />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default Course;
