import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Section } from 'react-materialize';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Booking.css'
export default function Booking() {

    const bookingURL = 'https://ygcapi.azurewebsites.net/api/learning/my';

    const token = useSelector(state => state.user.token);

    const [bookingClasses, setBookingClasses] = useState([]);
    useEffect(() => {
        const getAllBookingClass = async () => {

            const headers = {
                'Authorization': 'Bearer ' + token,
                'accept': '*/*'
            }

            try {
                const response = await axios.get(bookingURL, { headers });
                setBookingClasses(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllBookingClass();
    }, [token])

    return (
        <div className="booking_container">
            {bookingClasses?.map((bookingClass) => (
                <Container className='booking_cardContainer'>
                    <Card className="card" key={bookingClass.id}>
                        <h4 className='booking_className'>{bookingClass.id.ofClass.className} Class</h4>
                        <h5 className='booking_courseName'>Course: {bookingClass.id.ofClass.course.name}</h5>
                        <p>Start date: <span className='booking_startDate'>{bookingClass.id.ofClass.startDate}</span></p>
                        <p>End date: <span className='booking_endDate'>{bookingClass.id.ofClass.endDate}</span></p>
                        <p>Instructor: <span className='booking_instructorName'>{bookingClass.id.ofClass.instructor.fullName}</span></p>
                        <p>Phone: <span className='booking_instructorPhone'>{bookingClass.id.ofClass.instructor.phone}</span></p>
                        <button className="btn booking_btnDetail">
                            <Link to="/timetable">
                                <span className='booking_detail'>Detail</span>
                            </Link>
                        </button>
                    </Card>
                </Container>
            ))}
        </div>
    )
}
