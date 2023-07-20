import React from 'react'
import { Navbar } from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';

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
        <div>
            <Navbar>
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
                {
                    user ? (
                        <>
                            {
                                user.role === staffRole ? (
                                    <li>
                                        <Link to='/classList'>
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
                            <li onClick={handleLogout} style={{
                                cursor: 'pointer',
                            }}>
                                Log out
                            </li>
                        </>
                    ) : (
                        <>
                            <NavLink to='/login'>
                                Login
                            </NavLink>
                        </>
                    )
                }
            </Navbar>

        </div>
    )
}
