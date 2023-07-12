import React, { useState } from 'react'
import { Card, Icon, Section, TextInput } from 'react-materialize'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const registerURL = 'https://ygcapi.azurewebsites.net/api/auth/register';
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);

    const handleDateChange = (date) => {
        setDateOfBirth(date);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert('Password does not match');
            navigate('/register')
        }

        const payload = {
            phone: phone,
            fullName: fullName,
            password: password,
            confirm: confirm,
            email: email,
            address: address,
            dateOfBirth: dateOfBirth
        }

        const headers = {
            'accept': '*/*'
        };

        try {
            await axios.post(registerURL, payload, { headers })
            navigate('/login')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Section style={{
            backgroundColor: '#f0f2f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '70px'
        }}>
            <Card style={{
                width: '30%',
            }}>
                <form onSubmit={handleRegister}>

                    <TextInput label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                    <TextInput label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    <DatePicker selected={dateOfBirth} onChange={handleDateChange}
                        dateFormat='dd-MM-yyyy' showYearDropdown scrollableYearDropdown
                        yearDropdownItemNumber={100} placeholderText="Select your birthday" />
                    <TextInput label='Address' value={address} onChange={e => setAddress(e.target.value)} />
                    <TextInput label='Email' email value={email} onChange={e => setEmail(e.target.value)} />
                    <TextInput label='Password' password onChange={e => setPassword(e.target.value)} />
                    <TextInput label='Confirm password' password onChange={e => setConfirm(e.target.value)} />
                    <button type='submit'>
                        Sign Up
                        <Icon right>
                            send
                        </Icon>
                    </button>
                </form>
                <br />
                <Link to='/login'>
                    Login
                </Link>
            </Card>
        </Section>

    )
}
