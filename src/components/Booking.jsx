import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
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
        <Section>
            <div className="card-container">
                {bookingClasses?.map((bookingClass) => (
                    <Card className="card" key={bookingClass.id}>
                        <p>{bookingClass.id.ofClass.className}</p>
                        <p>{bookingClass.id.ofClass.instructor.phone}</p>
                        <p>{bookingClass.id.ofClass.instructor.fullName}</p>
                        <p>{bookingClass.id.ofClass.course.name}</p>
                        <p>{bookingClass.id.ofClass.course.description}</p>
                        <Link to="/timetable">
                            <button className="btn">Details</button>
                        </Link>
                    </Card>
                ))}
            </div>
        </Section>
        // <Section>
        //     {
        //         bookingClasses?.map((bookingClass) => {
        //             return (
        //                 <div>
        //                     <Card>
        //                         <p>{bookingClass.id.student.phone}</p>
        //                         <p>{bookingClass.id.student.email}</p>
        //                         <p>{bookingClass.id.student.fullName}</p>
        //                         <p>{bookingClass.id.student.address}</p>
        //                         <p>{bookingClass.id.student.dateOfBirth}</p>
        //                         <p>{bookingClass.id.student.status}</p>
        //                         <p>{bookingClass.id.ofClass.className}</p>
        //                         <p>{bookingClass.id.ofClass.startDate}</p>
        //                         <p>{bookingClass.id.ofClass.endDate}</p>
        //                         <p>{bookingClass.id.ofClass.capacity}</p>
        //                         <p>{bookingClass.id.ofClass.instructor.phone}</p>
        //                         <p>{bookingClass.id.ofClass.instructor.email}</p>
        //                         <p>{bookingClass.id.ofClass.instructor.fullName}</p>
        //                         <p>{bookingClass.id.ofClass.instructor.address}</p>
        //                         <p>{bookingClass.id.ofClass.instructor.dateOfBirth}</p>
        //                         <p>{bookingClass.id.ofClass.instructor.status}</p>
        //                         <p>{bookingClass.id.ofClass.course.name}</p>
        //                         <p>{bookingClass.id.ofClass.course.description}</p>
        //                         <p>{bookingClass.id.ofClass.course.price}</p>
        //                         <p>{bookingClass.price}</p>
        //                         <p>{bookingClass.startDate}</p>
        //                         <p>{bookingClass.status}</p>
        //                         <p>{bookingClass.payment.name}</p>
        //                         <Link to='/timetable'>
        //                             <button className='btn'>
        //                                 Details
        //                             </button>
        //                         </Link>
        //                     </Card>
        //                 </div>
        //             )
        //         })
        //     }

        // </Section>
    )
}
