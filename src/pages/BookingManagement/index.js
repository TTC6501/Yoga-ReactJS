import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './BookingManagement.css';

function BookingManagement() {
    const token = useSelector((state) => state.user.token);
    const bookingURL = 'https://ygcapi.azurewebsites.net/api/learning';
    // const bookingURL = 'http://localhost:8080/api/learning';

    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(bookingURL, {
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
        <div className="container">
            <div>
                <h2 className="title">Booking Management</h2>
                <div>
                    <Link className="dashboard-link" to="/dashboard">
                        Dashboard
                    </Link>
                </div>
                <form>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                    />
                </form>
                <table className="table">
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
            <div className="pagination">
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

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import moment from 'moment/moment';

// function BookingManagement() {
//     const token = useSelector(state => state.user.token);
    
//     const [bookings, setBookings] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const itemsPerPage = 6;

//     useEffect(() => {
//         fetch('https://ygcapi.azurewebsites.net/api/learning', {
//             method: 'GET',
//             headers: {
//                 Accept: '*/*',
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//             .then((response) => response.json())
//             .then((data) => setBookings(data))
//             .catch((error) => console.error(error));
//     }, [token]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchTerm]);
//     return (
//         <div>
//             <div>
//                 <h2>Booking Management</h2>
//                 <div>
//                     <Link to="/dashboard">Dashboard</Link>
//                 </div>
//                 <form>
//                     <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Search..."
//                     />
//                 </form>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid black' }}>Student</th>
//                             <th style={{ border: '1px solid black' }}>Customer phone</th>
//                             <th style={{ border: '1px solid black' }}>Class</th>
//                             <th style={{ border: '1px solid black' }}>Course</th>
//                             <th style={{ border: '1px solid black' }}>Instructor</th>
//                             <th style={{ border: '1px solid black' }}>Price</th>
//                             <th style={{ border: '1px solid black' }}>Date start</th>
//                             <th style={{ border: '1px solid black' }}>Pay type</th>
//                             <th style={{ border: '1px solid black' }}>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings
//                             .filter((booking) =>
//                                 booking.id.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
//                             )
//                             .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//                             .map((booking) => (
//                                 <tr key={booking.id}>
//                                     <td style={{ border: '1px solid black' }}>{booking.id.student.fullName}</td>
//                                     <td style={{ border: '1px solid black' }}>{booking.id.student.phone}</td>
//                                     <td style={{ border: '1px solid black' }}>{booking.id.ofClass.className}</td>
//                                     <td style={{ border: '1px solid black' }}>{booking.id.ofClass.course.name}</td>
//                                     <td style={{ border: '1px solid black' }}>
//                                         {booking.id.ofClass.instructor.fullName}
//                                     </td>
//                                     <td style={{ border: '1px solid black' }}>{booking.price}</td>
//                                     <td style={{ border: '1px solid black' }}>{moment(booking.startDate).format('YYYY-MM-DD')}</td>
//                                     <td style={{ border: '1px solid black' }}>{booking.payment.name}</td>
//                                     <td style={{ border: '1px solid black' }}>{booking.status}</td>
//                                 </tr>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 {Array(Math.ceil(bookings.length / itemsPerPage))
//                     .fill()
//                     .map((_, index) => (
//                         <button key={index} onClick={() => setCurrentPage(index + 1)}>
//                             {index + 1}
//                         </button>
//                     ))}
//             </div>
//         </div>
//     );
// }

// export default BookingManagement;
