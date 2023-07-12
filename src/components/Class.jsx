import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { Link } from 'react-router-dom';

export default function Class() {

    const classURL = 'https://ygcapi.azurewebsites.net/api/class';

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getAllClasses = async () => {
            try {
                const response = await axios.get(classURL);
                setClasses(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllClasses();
    }, [])

    return (
        <Section>
            {
                classes?.map((element) => {
                    return (
                        <Card key={element.classId}>
                            <p>{element.className}</p>
                            <p>{element.startDate}</p>
                            <p>{element.endDate}</p>
                            <p>{element.capacity}</p>
                            <p>{element.instructor.phone}</p>
                            <p>{element.instructor.email}</p>
                            <p>{element.instructor.fullName}</p>
                            <p>{element.instructor.address}</p>
                            <p>{element.instructor.dateOfBirth}</p>
                            <p>{element.instructor.status}</p>
                            <p>{element.course.description}</p>
                            <p>{element.course.name}</p>
                            <p>{element.course.price}</p>
                            <Link to={`/class/${element.classId}`}>
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
