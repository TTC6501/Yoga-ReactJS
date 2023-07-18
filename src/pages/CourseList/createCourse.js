import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function CreateCourse() {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();
    const [course, setCourse] = useState({
        courseId: 0,
        name: '',
        description: '',
        price: 0,
    });

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value,
        });
    };

    const navigateToClass = () => {
        navigate('/course');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://ygcapi.azurewebsites.net/api/course';
            const headers = {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(url, course, { headers });
            console.log(response.data);
            navigate('/courseList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={navigateToClass}>Course</button>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={course.name}
                        onChange={handleChange}
                        placeholder="Course Name"
                    />
                </label>
                <lable>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Course Description"
                    />
                </lable>
                <lable>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        placeholder="Course Price"
                    />
                </lable>

                <button type="submit">Create Course</button>
            </form>
        </div>
    );
}

export default CreateCourse;
