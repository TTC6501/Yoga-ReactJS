import React from 'react'
import { Navbar } from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';

export default function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            <Navbar>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink>
                    Blog
                </NavLink>
                <NavLink>
                    Class
                </NavLink>
                <NavLink>
                    Service
                </NavLink>

                {
                    user ? (
                        <>
                            <li>
                                <Link to='/profile'>
                                    Profile
                                </Link>
                            </li>
                            <li onClick={handleLogout}>
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
            {
                user ? (
                    <div>
                        <h1>
                            {user.phone}
                        </h1>
                    </div>
                ) : (
                    <div>
                        <h1>
                            Guest
                        </h1>
                    </div>
                )
            }

        </div>

    )
}
