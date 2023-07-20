import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ClassDetails.css';
import { Container } from 'react-materialize';

export default function ClassDetails() {
    const { classId } = useParams();
    const classDetailsURL = `https://ygcapi.azurewebsites.net/api/class/${classId}`;

    const [Class, setClass] = useState('');

    useEffect(() => {
        const getClass = async () => {
            try {
                const response = await axios.get(classDetailsURL);
                setClass(response.data);
                console.log(Class);
            } catch (error) {
                console.log(error);
            }
        }

        getClass();
    }, [])

    return (
        <div className='classDetail_container'>
            {Class ? (
                <Container className='center'>
                    <h2 className='classDetail_className'>Class: {Class.className}</h2>

                    <h4 className='classDetail_courseName'>Course: {Class.course.name}</h4>

                    <p>Start date: <span className='classDetail_startDate'>{Class.startDate}</span></p>
                    <p>End date: <span className='classDetail_endDate' >{Class.endDate}</span></p>
                    <p>Instructor: <span className='classDetail_instructorName' >{Class.instructor.fullName}</span></p>
                    <p className='classDetail_courseDescription'>{Class.course.description}</p>
                    <p><span className='classDetail_coursePrice' >{Class.course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                    <button className='btn classDetail_btnBookClass'>
                        <Link to={`/payment/${Class.classId}`}>
                            <span className='classDetail_bookClass'> Book Class</span>
                        </Link>
                    </button>

                </Container>
            ) : (
                <p>Loading class details...</p>
            )}
        </div>
    )
}
