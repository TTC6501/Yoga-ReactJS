import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Section } from 'react-materialize';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Booking.css';

export default function Booking() {
  const bookingURL = 'https://ygcapi.azurewebsites.net/api/learning/my';
  const token = useSelector((state) => state.user.token);
  const [bookingClasses, setBookingClasses] = useState([]);

  useEffect(() => {
    const getAllBookingClasses = async () => {
      const headers = {
        Authorization: 'Bearer ' + token,
        accept: '*/*',
      };

      try {
        const response = await axios.get(bookingURL, { headers });
        setBookingClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBookingClasses();
  }, [token]);

  return (
    <Section>
      <div className="card-container">
        {bookingClasses?.map((bookingClass) => (
          <Card className="card" key={bookingClass.id}>
            <p>{bookingClass.id.student.phone}</p>
            <p>{bookingClass.id.student.email}</p>
            <p>{bookingClass.id.student.fullName}</p>
            <p>{bookingClass.id.student.address}</p>
            <p>{bookingClass.id.student.dateOfBirth}</p>
            <p>{bookingClass.id.ofClass.className}</p>
            <p>{bookingClass.id.ofClass.instructor.phone}</p>
            <p>{bookingClass.id.ofClass.instructor.fullName}</p>
            <p>{bookingClass.id.ofClass.instructor.address}</p>
            <p>{bookingClass.id.ofClass.course.name}</p>
            <p>{bookingClass.id.ofClass.course.description}</p>
            <p>{bookingClass.price}</p>
            <p>{bookingClass.status}</p>
            <p>{bookingClass.payment.name}</p>
            <Link to="/timetable">
              <button className="btn">Details</button>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
