import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { Link } from 'react-router-dom';
import './Class.css';
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
            <div className="class_container">
                {classes?.map((element) => (
                    <Card className="card_background class_card" key={element.classId}>
                        <h3 className='className'>{element.className} Class</h3>
                        <h5 >Course: <span className='courseName'>{element.course.name}</span> </h5>
                        <p>
                            <strong className='coursePrice'>{element.course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                        </p>
                        <Link to={`/class/${element.classId}`}>
                            <button className="btn btnDetailClass">
                                <span className='detailsClass-text'>Details</span>
                            </button>
                        </Link>
                    </Card>
                ))}
            </div>
        </Section>
    )
}
