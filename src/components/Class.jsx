import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Section } from 'react-materialize';
import { Link } from 'react-router-dom';
import './Class.css';

export default function Class() {
  const classURL = 'https://ygcapi.azurewebsites.net/api/class';
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getAllClasses = async () => {
      try {
        const response = await axios.get(classURL);
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllClasses();
  }, []);

  return (
    <Section>
      <div className="card-container">
        {classes?.map((element) => (
          <Card className="card" key={element.classId}>
            <p>{element.className}</p>
            <p>{element.startDate}</p>
            <p>{element.endDate}</p>
            <p>{element.capacity}</p>
            <p>{element.instructor.fullName}</p>
            <p>{element.course.description}</p>
            <p>{element.course.name}</p>
            <p>{element.course.price}</p>
            <Link to={`/class/${element.classId}`}>
              <button className="btn">Details</button>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
