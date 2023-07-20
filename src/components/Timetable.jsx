import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Section } from 'react-materialize';
import { useSelector } from 'react-redux'
import moment from 'moment';
import './Timetable.css';

export default function Timetable() {
    const timetableURL = 'https://ygcapi.azurewebsites.net/api/timetable/my';

    const token = useSelector(state => state.user.token);
    const [timeTable, setTimeTable] = useState([]);

    useEffect(() => {
        const getAllTimetable = async () => {

            const headers = {
                'Authorization': 'Bearer ' + token,
                'accept': '*/*'
            }

            try {
                const response = await axios.get(timetableURL, { headers })
                setTimeTable(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllTimetable();

    }, [token])

    return (
        <div className='timetable_container'>
            {
                timeTable?.map((timeTable) => {
                    return (
                        <Container className='timetable_cardContainer' key={timeTable.timetableId}>
                            <Card className='card'>
                                <h4 className='timetable_className'>{timeTable.ofClass.className} Class</h4>
                                <h5 className='timetable_courseName'>Course: {timeTable.ofClass.course.name}</h5>
                                <p>Slot: <span className='timetable_slot'>{timeTable.slotNo}</span></p>
                                <p>Start at: <span className='timetable_time'>{timeTable.time}</span></p>
                                <p>Instructor: <span className='timetable_instructorName'>{timeTable.ofClass.instructor.fullName}</span></p>
                                <p>Phone: <span className='timetable_instructorPhone'>{timeTable.ofClass.instructor.phone}</span></p>
                                <p>Substitute instructor: <span className='timetable_substituteInstructorName'> {timeTable.instructor.fullName}</span> (if necessary)</p>
                                <p>Phone: <span className='timetable_substituteInstructorPhone'>{timeTable.instructor.phone}</span></p>
                                <p>Room: <span className='timetable_room'>{timeTable.room.name}</span></p>
                            </Card>
                        </Container>
                    )
                })
            }
        </div>
    )
}
