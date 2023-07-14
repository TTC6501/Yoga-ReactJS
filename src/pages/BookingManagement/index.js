import React, { useEffect, useState } from 'react';

function BookingManagement() {
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MzI1MzE4LCJleHAiOjE2ODk0MTE3MTh9.pzxYhuZgJ9SLWDzj2oDACxSn7Lko6nWssHCy3xpfhbo';
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    useEffect(() => {
        fetch('https://ygcapi.azurewebsites.net/api/learning', {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    return (
        <div>
            <div>
                <h2>Booking Management</h2>
                <div>
                    <a href="/dashboard">Dashboard</a>
                </div>
                <form>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                    />
                </form>
                <table>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Student</th>
                            <th style={{ border: '1px solid black' }}>Customer phone</th>
                            <th style={{ border: '1px solid black' }}>Class</th>
                            <th style={{ border: '1px solid black' }}>Course</th>
                            <th style={{ border: '1px solid black' }}>Instructor</th>
                            <th style={{ border: '1px solid black' }}>Price</th>
                            <th style={{ border: '1px solid black' }}>Date start</th>
                            <th style={{ border: '1px solid black' }}>Pay type</th>
                            <th style={{ border: '1px solid black' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings
                            .filter((booking) =>
                                booking.id.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
                            )
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((booking) => (
                                <tr key={booking.id}>
                                    <td style={{ border: '1px solid black' }}>{booking.id.student.fullName}</td>
                                    <td style={{ border: '1px solid black' }}>{booking.id.student.phone}</td>
                                    <td style={{ border: '1px solid black' }}>{booking.id.ofClass.className}</td>
                                    <td style={{ border: '1px solid black' }}>{booking.id.ofClass.course.name}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        {booking.id.ofClass.instructor.fullName}
                                    </td>
                                    <td style={{ border: '1px solid black' }}>{booking.price}</td>
                                    <td style={{ border: '1px solid black' }}>{booking.startDate}</td>
                                    <td style={{ border: '1px solid black' }}>{booking.payment.name}</td>
                                    <td style={{ border: '1px solid black' }}>{booking.status}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div>
                {Array(Math.ceil(bookings.length / itemsPerPage))
                    .fill()
                    .map((_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default BookingManagement;
