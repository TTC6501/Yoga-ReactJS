import axios from 'axios';
import React, { useState } from 'react'
import { Card, Section, TextInput } from 'react-materialize'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const changePasswordURL = 'https://ygcapi.azurewebsites.net/api/user/profile';
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const payload = {
            oldPassword: password,
            confirm: confirm,
            newPassword: newPassword
        }

        const headers = {
            'Authorization': 'Bearer ' + token,
            'accept': '*/*'
        }

        try {
            const response = await axios.post(changePasswordURL, payload, { headers })
            if (response.status === 200) {
                navigate('/login')
            }

        } catch (error) {
            alert('Can you check again your current password or confirm password');
        }

    }

    return (
        <Section>
            <Card>
                <h5>Change Password</h5>
                <form onSubmit={handleChangePassword}>
                    <TextInput label='Current Password' password onChange={e => setPassword(e.target.value)} />
                    <TextInput label='New Password' password onChange={e => setNewPassword(e.target.value)} />
                    <TextInput label='Confirm Password' password onChange={e => setConfirm(e.target.value)} />
                    <button type='submit' className='btn'>
                        Change
                    </button>
                </form>
            </Card>
        </Section>
    )
}
