import React from 'react'
import { Icon, NavItem, Navbar } from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import './Header.css'

export default function Header() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    const staffRole = "STAFF";


    return (
        <Navbar className='navbar_header'>
            <Icon left>menu</Icon>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/course'>
                Course
            </NavLink>
            <NavLink to='/blog'>
                Blog
            </NavLink>
            <NavLink to='/class'>
                Class
            </NavLink>
            <NavItem>
                <img src='logo.jpg' className='imageHeader' />
            </NavItem>
            {
                user ? (
                    <>
                        {
                            user.role === staffRole ? (
                                <li>
                                    <Link to='/timetable'>
                                        Schedule
                                    </Link>
                                </li>

                            ) : (
                                <li>
                                    <Link to='/booking'>
                                        Class Booking
                                    </Link>
                                </li>
                            )
                        }
                        <li>
                            <Link to='/profile'>
                                Profile
                            </Link>
                        </li>
                        <li onClick={handleLogout} className='logout'>
                            Log out
                        </li>
                    </>
                ) : (
                    <>
                        <NavLink to='/login' className='login'>
                            Login
                        </NavLink>
                    </>
                )
            }
        </Navbar>
    )
}
