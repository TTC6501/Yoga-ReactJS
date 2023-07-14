import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Room() {
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
        const response = await axios.get('https://ygcapi.azurewebsites.net/api/room');
        setRooms(response.data);
    };



    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <h2>Room page</h2>
            <div>
                <a href="/dashboard">Dashboard</a>
            </div>
            <div>
                <form onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search Room" />
                </form>
                <table style={{ borderCollapse: 'collapse' }}>
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
