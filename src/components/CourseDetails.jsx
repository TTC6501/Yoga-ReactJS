import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-materialize';
import { Link, useParams } from 'react-router-dom'
import './CourseDetails.css';

export default function CourseDetails() {

    const { courseId } = useParams();

    const courseDetailsURL = `https://ygcapi.azurewebsites.net/api/course/${courseId}`;

    const [course, setCourse] = useState('');

    useEffect(() => {
        const getCourse = async () => {
            try {
                const response = await axios.get(courseDetailsURL);
                setCourse(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getCourse();

    }, [courseDetailsURL])

    const formattedPrice = course?.price ? course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''

    return (
        <div className='courseDetails-container'>
            <h3 className='courseDetails-name'>{course.name}</h3>
            <Container className='description-container'>
                <p className='courseDetails-description'>{course.description}</p>
                <p className='courseDetails-price'>{formattedPrice}</p>
                <button className='btn btn-booking'>
                    <Link to='#' className='book-text'>Book</Link>
                </button>
            </Container>
        </div>
    )
}
