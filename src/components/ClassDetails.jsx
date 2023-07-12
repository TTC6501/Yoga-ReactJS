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
            } catch (error) {
                console.log(error);
            }
        }

        getClass();
    }, [classDetailsURL])

    return (
        <Section>
            <Card>
                <p>{Class.className}</p>
                <p>{Class.startDate}</p>
                <p>{Class.endDate}</p>
                <p>{Class.capacity}</p>
                <Link to={`/payment/${Class.classId}`}>
                    <button className='btn'>
                        Book Class
                    </button>
                </Link>
            </Card>
        </Section>
    )
}
