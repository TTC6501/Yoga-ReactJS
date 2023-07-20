import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { Link, useParams } from 'react-router-dom'

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
        <Section>
            {Class ? (
                <Card>
                    <h3>Class: {Class.className}</h3>
                    {Class.course ? (
                        <h4>Course: {Class.course.name}</h4>
                    ) : (
                        <h4>Course: Loading...</h4>
                    )}
                    <p><strong style={{
                        fontSize: '25px'
                    }}>{Class.startDate}</strong></p>
                    <p><strong style={{
                        fontSize: '25px'
                    }}>{Class.endDate}</strong></p>
                    <p><strong style={{
                        fontSize: '25px'
                    }}>Mentor: {Class.instructor.fullName}</strong></p>
                    <p><strong style={{
                        fontSize: '25px',
                        fontStyle: 'italic'
                    }}>{Class.course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong></p>
                    <Link to={`/payment/${Class.classId}`}>
                        <button className='btn'>
                            Book Class
                        </button>
                    </Link>
                </Card>
            ) : (
                <p>Loading class details...</p>
            )}
        </Section>
    )
}
