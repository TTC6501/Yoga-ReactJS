import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

function CreateClass() {
    const token = useSelector((state) => state.user.token);

    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [Class, setClass] = useState({
        classTitle: '',
        startDate: '',
        endDate: '',
        capacity: 0,
        instructorPhone: '',
        courseId: 0,
    });

    useEffect(() => {
        const fetchStaff = async () => {
            const url = 'https://ygcapi.azurewebsites.net/api/user';
            const headers = {
                Authorization: 'Bearer ' + token,
                accept: '*/*',
            };
            const response = await axios.get(url, { headers });
            const staff = response.data.filter((user) => user.role === 'STAFF');
            setStaffList(staff);
            if (staff.length > 0) {
                setClass((prevClass) => ({
                    ...prevClass,
                    instructorPhone: staff[0].phone,
                }));
            }
        };
        fetchStaff();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            const url = 'https://ygcapi.azurewebsites.net/api/course';
            const headers = {
                accept: '*/*',
            };
            const response = await axios.get(url, { headers });
            setCourseList(response.data);
            if (response.data.length > 0) {
                setClass((prevClass) => ({
                    ...prevClass,
                    courseId: response.data[0].courseId,
                }));
            }
        };
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        setClass({
            ...Class,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://ygcapi.azurewebsites.net/api/class';
            const headers = {
                Authorization: 'Bearer ' + token,
                accept: '*/*',
            };

            const response = await axios.post(url, { ...Class, className: Class.classTitle }, { headers }); // Added className: Class.classTitle
            console.log(response.data);
            navigate('/classList');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(<p style={{ color: 'red' }}>Start date must be less than or equal to end date and end date must be greater than or equal to start date </p>);
            }
        }
    };

    const navigateToClass = () => {
        navigate('/classList');
    };

    return (
        <div className="container">
            <button
                style={{
                    backgroundColor: '#ffc107',
                    color: 'black',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    display: 'inline-block',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '4px 2px',
                }}
                onClick={navigateToClass}
            >
                Class
            </button>
            <form onSubmit={handleSubmit}>
                <label>
                    Class Name:
                    <input type="text" name="classTitle" onChange={handleChange} />
                </label>
                <label>
                    Start Date:
                    <input type="date" name="startDate" onChange={handleChange} />
                </label>
                <label>
                    End Date:
                    <input type="date" name="endDate" onChange={handleChange} />
                </label>
                {errorMessage && <p>{errorMessage}</p>}
                <label>
                    Capacity:
                    <input type="number" name="capacity" onChange={handleChange} />
                </label>
                <label>
                    Instructor:
                    <Select
                        name="instructorPhone"
                        options={staffList.map((staff) => ({ value: staff.phone, label: staff.fullName }))}
                        onChange={(selectedOption) => setClass({ ...Class, instructorPhone: selectedOption.value })}
                    />
                </label>
                <label>
                    Course:
                    <Select
                        name="courseId"
                        options={courseList.map((course) => ({ value: course.courseId, label: course.name }))}
                        onChange={(selectedOption) => setClass({ ...Class, courseId: selectedOption.value })}
                    />
                </label>
                <input
                    style={{
                        backgroundColor: '#ffc107',
                        color: 'black',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        display: 'inline-block',
                        border: 'none',
                        cursor: 'pointer',
                        margin: '4px 2px',
                    }}
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
}

export default CreateClass;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

// function CreateClass() {
//     const token = useSelector((state) => state.user.token);

//     const navigate = useNavigate();
//     const [staffList, setStaffList] = useState([]);
//     const [courseList, setCourseList] = useState([]);
//     const [Class, setClass] = useState({
//         classTitle: '',
//         startDate: '',
//         endDate: '',
//         capacity: 0,
//         instructorPhone: '',
//         courseId: 0,
//     });

//     useEffect(() => {
//         const fetchStaff = async () => {
//             const url = 'https://ygcapi.azurewebsites.net/api/user';
//             const headers = {
//                 Authorization: 'Bearer ' + token,
//                 accept: '*/*',
//             };
//             const response = await axios.get(url, { headers });
//             const staff = response.data.filter((user) => user.role === 'STAFF');
//             setStaffList(staff);
//             if (staff.length > 0) {
//                 setClass((prevClass) => ({
//                     ...prevClass,
//                     instructorPhone: staff[0].phone,
//                 }));
//             }
//         };
//         fetchStaff();
//     }, []);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             const url = 'https://ygcapi.azurewebsites.net/api/course';
//             const headers = {
//                 accept: '*/*',
//             };
//             const response = await axios.get(url, { headers });
//             setCourseList(response.data);
//             if (response.data.length > 0) {
//                 setClass((prevClass) => ({
//                     ...prevClass,
//                     courseId: response.data[0].courseId,
//                 }));
//             }
//         };
//         fetchCourses();
//     }, []);

//     const handleChange = (e) => {
//         setClass({
//             ...Class,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = 'https://ygcapi.azurewebsites.net/api/class';
//             const headers = {
//                 Authorization: 'Bearer ' + token,
//                 accept: '*/*',
//             };

//             const response = await axios.post(url, { ...Class, className: Class.classTitle }, { headers }); // Added className: Class.classTitle
//             console.log(response.data);
//             navigate('/classList');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const navigateToClass = () => {
//         navigate('/classList');
//     };

//     return (
//         <div className="my_component">
//             <button onClick={navigateToClass}>Class</button>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Class Name:
//                     <input type="text" name="classTitle" onChange={handleChange} />
//                 </label>
//                 <label>
//                     Start Date:
//                     <input type="date" name="startDate" onChange={handleChange} />
//                 </label>
//                 <label>
//                     End Date:
//                     <input type="date" name="endDate" onChange={handleChange} />
//                 </label>
//                 <label>
//                     Capacity:
//                     <input type="number" name="capacity" onChange={handleChange} />
//                 </label>
//                 <label>
//                     Instructor Phone:
//                     <select name="instructorPhone" onChange={handleChange}>
//                         {staffList.map((staff, index) => (
//                             <option key={index} value={staff.phone}>
//                                 {staff.phone}
//                             </option>
//                         ))}
//                     </select>
//                 </label>
//                 <label>
//                     Course:
//                     <select name="courseId" onChange={handleChange}>
//                         {courseList.map((course, index) => (
//                             <option key={index} value={course.courseId}>
//                                 {course.name} {/* Display the course name */}
//                             </option>
//                         ))}
//                     </select>
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         </div>
//     );
// }

// export default CreateClass;