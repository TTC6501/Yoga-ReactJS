import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-materialize';
import { Link } from 'react-router-dom';
import './Course.css';
export default function Course() {

    const courseURL = 'https://ygcapi.azurewebsites.net/api/course';

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getAllCourse = async () => {
            try {
                const response = await axios.get(courseURL);
                setCourses(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllCourse();
    }, [])

    return (
        <div className="course_container">
            {courses?.map((course) => (
                <Card className="card_background course_card" key={course.courseId}>
                    <h3 className='course-name'>{course.name}</h3>
                    <p className='course-description'>{course.description}</p>
                    <p className='course-price'>{course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    <Link to={`/course/${course.courseId}`}>
                        <button className="btn course_btnDetail">
                            <span className='details-text'>Details</span>
                        </button>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
