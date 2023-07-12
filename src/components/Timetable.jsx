import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section } from 'react-materialize';
import { useSelector } from 'react-redux'

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

        handleFilterAndPush();

    }, [token])

    const handleFilterAndPush = () => {
        const currentDate = new Date();

        const filtered = timeTable.filter((timeTable) => timeTable.time >= currentDate);
        const smallerDates = timeTable.filter((timeTable) => timeTable.time < currentDate);
        const newDates = [...filtered, ...smallerDates];
        setTimeTable(newDates);
    }


    return (
        <Section>
            {
                timeTable?.map((date) => {
                    return (
                        <h5> {date.time}</h5>
                    )
                })
            }
            {
                timeTable?.map((timeTable) => {
                    return (
                        <div key={timeTable.timetableId}>
                            <Card>
                                <p>{timeTable.timetableId}</p>
                                <p>{timeTable.slotNo}</p>
                                <p>{timeTable.time}</p>
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
