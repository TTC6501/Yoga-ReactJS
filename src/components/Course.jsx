import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { Link } from 'react-router-dom';

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
        <Section>
            {
                courses?.map((course) => {
                    return (
                        <Card key={course.courseId}>
                            <p>{course.name}</p>
                            <p>{course.description}</p>
                            <p>{course.price}</p>
                            <Link to={`/course/${course.courseId}`}>
                                <button className='btn'>
                                    Details
                                </button>
                            </Link>
                        </Card>
                    )
                })
            }
        </Section>
    )
}
