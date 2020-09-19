import React from "react";
import axios from 'axios';
import makeToast from "../Toaster";

const RegisterPage = (props) => {
    const nameRef = React.createRef();
    const surnameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = () => {
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios
            .post('http://localhost:1616/api/auth/register', {
                name,
                surname,
                email,
                password
            })
            .then(response => {
                makeToast('success', response.data.message)
            })
            .catch(err => {
                makeToast('error', err.response.data.message);
            })
    }

    return <div className='card'>
        <div className='cardHeader'>
            Registration
        </div>
        <div className='cardBody'>
            <div className='inputGroup'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Ant'
                    ref={nameRef}
                />
            </div>
            <div className='inputGroup'>
                <label htmlFor='surname'>Surname</label>
                <input
                    type='text'
                    name='surname'
                    id='surname'
                    placeholder='Dock'
                    ref={surnameRef}
                />
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='email@email.com'
                    ref={emailRef}
                />
            </div>
            <div className='inputGroup'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    ref={passwordRef}
                />
            </div>
            <button onClick={registerUser}>Register</button>
        </div>
    </div>;
}

export default RegisterPage;
