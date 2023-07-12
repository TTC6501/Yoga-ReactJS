import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { useParams } from 'react-router-dom'

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

    return (
        <Section>
            <Card>
                <p>{course.name}</p>
                <p>{course.description}</p>
                <p>{course.price}</p>
            </Card>
        </Section>
    )
}
