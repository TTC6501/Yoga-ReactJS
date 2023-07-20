import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Room.css';

function Room() {
    // const roomURL = 'http://localhost:8080/api/room';
    const roomURL = 'https://ygcapi.azurewebsites.net/api/room';
    const [Rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term === '') {
            fetchRooms();
        } else {
            const filteredRooms = Rooms.filter(Room => Room.name.toLowerCase().includes(term.toLowerCase()));
            setRooms(filteredRooms);
        }
    };


    const fetchRooms = async () => {
        const response = await axios.get(roomURL);
        setRooms(response.data);
    };



    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="container">
            <h2 className="title">Room page</h2>
            <div>
                <Link className="dashboard-link" to="/dashboard">Dashboard</Link>
            </div>
            <div>
                <form onSubmit={handleSearch}>
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search Room" />
                </form>
                <table className="table" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Name</th>
                            <th style={{ border: '1px solid black' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Rooms.map((Room) => (
                            <tr key={Room.roomId}>
                                <td style={{ border: '1px solid black' }}>{Room.name}</td>
                                <td style={{ border: '1px solid black' }}>{Room.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Room;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Room() {
//     const [Rooms, setRooms] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = (e) => {
//         const term = e.target.value;
//         setSearchTerm(term);
//         if (term === '') {
//             fetchRooms();
//         } else {
//             const filteredRooms = Rooms.filter(Room => Room.name.toLowerCase().includes(term.toLowerCase()));
//             setRooms(filteredRooms);
//         }
//     };


//     const fetchRooms = async () => {
//         const response = await axios.get('https://ygcapi.azurewebsites.net/api/room');
//         setRooms(response.data);
//     };



//     useEffect(() => {
//         fetchRooms();
//     }, []);

//     return (
//         <div>
//             <h2>Room page</h2>
//             <div>
//                 <Link to="/dashboard">Dashboard</Link>
//             </div>
//             <div>
//                 <form onSubmit={handleSearch}>
//                     <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search Room" />
//                 </form>
//                 <table style={{ borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid black' }}>Name</th>
//                             <th style={{ border: '1px solid black' }}>Description</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Rooms.map((Room) => (
//                             <tr key={Room.roomId}>
//                                 <td style={{ border: '1px solid black' }}>{Room.name}</td>
//                                 <td style={{ border: '1px solid black' }}>{Room.description}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default Room;
