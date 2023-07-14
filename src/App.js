import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Authenticate from './Auth/Authenticate';
import { useSelector } from 'react-redux';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import Blog from './components/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import Class from './components/Class';
import ClassDetails from './components/ClassDetails';
import Course from './components/Course';
import CourseDetails from './components/CourseDetails';
import Payment from './components/Payment';
import Booking from './components/Booking';
import Timetable from './components/Timetable';
import config from './config';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import ClassList from './pages/ClassList';
import CourseList from './pages/CourseList';
import Room from './pages/Room';
import CreateCourse from './pages/CourseList/createCourse';
import CreateClass from './pages/ClassList/createClass';
import CreateTimeTable from './pages/Timetable/createTimeTable';
import TimeTableList from './pages/Timetable/timeTableList';
import BookingManagement from './pages/BookingManagement';
import Staff from './pages/Staff';

function App() {

  const user = useSelector(state => state.user.user);
  const admin = 'admin';

  return (
    <div>
      {/* User, Staff UI */}
      {
        user?.role.toLowerCase() !== admin && (
          <>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Authenticate><Profile /></Authenticate>} />
              <Route path='/password' element={<Authenticate><ChangePassword /></Authenticate>} />
              <Route path='/course' element={<Course />} />
              <Route path='/course/:courseId' element={<CourseDetails />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/class' element={<Class />} />
              <Route path='/class/:classId' element={<ClassDetails />} />
              <Route path='/payment/:classId' element={<Authenticate><Payment /></Authenticate>} />
              <Route path='/booking' element={<Authenticate><Booking /></Authenticate>} />
              <Route path='/timetable' element={<Authenticate><Timetable /></Authenticate>} />
            </Routes>
            <Footer />
          </>
        )
      }

      {/* Admin UI */}

      {
        user?.role.toLowerCase() === admin && (
          <>
            <Routes>
              <Route path="/" element={<Navigate to={config.routes.dashboard} />} />
              <Route path={config.routes.dashboard} element={<Dashboard />} />
              <Route path={config.routes.user} element={<User />} />
              <Route path={config.routes.class} element={<ClassList />} />
              <Route path={config.routes.course} element={<CourseList />} />
              <Route path={config.routes.room} element={<Room />} />
              <Route path={config.routes.createCourse} element={<CreateCourse />} />
              <Route path={config.routes.createClass} element={<CreateClass />} />
              <Route path={config.routes.createTimeTable} element={<CreateTimeTable />} />
              <Route path={config.routes.timeTableList} element={<TimeTableList />} />
              <Route path={config.routes.bookingManagement} element={<BookingManagement />} />
              <Route path={config.routes.staff} element={<Staff />} />
            </Routes>
          </>
        )
      }


    </div>
  );
}

export default App;
