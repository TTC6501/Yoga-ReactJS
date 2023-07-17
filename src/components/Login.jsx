import React, { useState } from 'react'
import { Card, Section, TextInput } from 'react-materialize'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginURL = 'https://ygcapi.azurewebsites.net/api/auth/login';

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const headers = {
                'accept': '*/*'
            };

            const response = await axios.post(loginURL, {
                phone,
                password
            }, { headers });

            if (response.status === 200) {
                const user = response.data.user; // get user data was login from server
                const token = response.data.token

                const userData = {
                    user: user,
                    token: token,
                }
                dispatch(login(userData)); // store user data in redux
                let result = user.role === 'ADMIN';
                if (result) {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }

        } catch (error) {
            alert('Please check again your phone or password.')
            navigate('/login');
        }
    }

    return (
        <Section style={{
            backgroundColor: '#f0f2f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '165px'
        }}>
            <Card>
                <form onSubmit={handleLogin}>
                    <div>
                        <TextInput label="Phone" name='phone' onChange={(e) => setPhone(e.target.value)} style={{
                            width: 300
                        }} />
                    </div>
                    <div>
                        <TextInput label="Password" password name='password' onChange={(e) => setPassword(e.target.value)} style={{ width: 300 }} />
                    </div>
                    <div style={{ textAlign: 'end', marginBottom: 10 }}>
                        <Link to='#'>Forgot password?</Link>
                    </div>
                    <div>
                        <button type='submit' style={{
                            width: '100%'
                        }}>
                            Login
                        </button>
                    </div>
                </form>
                <div style={{
                    textAlign: 'center',
                    marginTop: '30px'
                }}>
                    <Link to='/register'>Create new account</Link>
                </div>
            </Card>
        </Section>

    )
}
