import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { useSelector } from 'react-redux'
import moment from 'moment';

export default function Timetable() {
    const timetableURL = 'https://ygcapi.azurewebsites.net/api/timetable/my';

    const token = useSelector(state => state.user.token);
    const [timeTable, setTimeTable] = useState([]);
    const [newDates, setNewDates] = useState([]);

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
        <Section>

            {
                timeTable?.map((timeTable) => {
                    return (
                        <div key={timeTable.timetableId}>
                            <Card>
                                <p>{timeTable.timetableId}</p>
                                <p>{timeTable.slotNo}</p>
                                <p>{moment(timeTable.time).format('YYYY-MM-DD')}</p>
                                <p>{timeTable.ofClass.className}</p>
                                <p>{timeTable.ofClass.startDate}</p>
                                <p>{timeTable.ofClass.endDate}</p>
                                <p>{timeTable.ofClass.capacity}</p>
                                <p>{timeTable.ofClass.instructor.phone}</p>
                                <p>{timeTable.ofClass.instructor.email}</p>
                                <p>{timeTable.ofClass.instructor.fullName}</p>
                                <p>{timeTable.ofClass.instructor.address}</p>
                                <p>{timeTable.ofClass.instructor.dateOfBirth}</p>
                                <p>{timeTable.ofClass.instructor.status}</p>
                                <p>{timeTable.ofClass.course.name}</p>
                                <p>{timeTable.ofClass.course.description}</p>
                                <p>{timeTable.ofClass.course.price}</p>
                                <p>{timeTable.instructor.phone}</p>
                                <p>{timeTable.instructor.email}</p>
                                <p>{timeTable.instructor.fullName}</p>
                                <p>{timeTable.instructor.address}</p>
                                <p>{timeTable.instructor.dateOfBirth}</p>
                                <p>{timeTable.instructor.status}</p>
                                <p>{timeTable.room.name}</p>
                                <p>{timeTable.room.description}</p>

                            </Card>
                        </div>

                    )
                })
            }
        </Section>
    )
}
