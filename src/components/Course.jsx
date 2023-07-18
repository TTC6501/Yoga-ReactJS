import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Section } from 'react-materialize';
import { Link } from 'react-router-dom';
import './Course.css';

export default function Course() {
  const courseURL = 'https://ygcapi.azurewebsites.net/api/course';
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axios.get(courseURL);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCourses();
  }, []);

  return (
    <Section>
      <div className="card-container">
        {courses?.map((course) => (
          <Card className="card" key={course.courseId}>
            <p>{course.name}</p>
            <p>{course.description}</p>
            <p>{course.price}</p>
            <Link to={`/course/${course.courseId}`}>
              <button className="btn">Details</button>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
