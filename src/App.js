import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Authenticate from './Auth/Authenticate';
import { Provider } from 'react-redux';
import store from './redux/store'
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

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
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
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
