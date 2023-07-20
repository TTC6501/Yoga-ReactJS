import React from 'react'
import { Navbar } from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

export default function Headers() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div>
            <Navbar>
                <NavLink to='/user'>
                    User
                </NavLink>
                <NavLink to='/staff'>
                    Staff
                </NavLink>
                <NavLink to='/classList'>
                    Class
                </NavLink>
                <NavLink to='/courseList'>
                    Course
                </NavLink>
                <NavLink to='/bookingManagement'>
                    Booking
                </NavLink>
                <NavLink onClick={handleLogout} className='logout'>
                    Logout
                </NavLink>

            </Navbar>
        </div>
    )
}
