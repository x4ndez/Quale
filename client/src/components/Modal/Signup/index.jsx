import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_USER, USERNAME_EXISTS, EMAIL_EXISTS } from '../../../../utils/graphql/mutations'
import { useNavigate } from 'react-router-dom'

function Signup(props) {

    const navigate = useNavigate();

    const [usernameVal, setUsernameVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    // 0 = default, 1 = error, 2 = ok, 3 = X already exists
    const [passwordErr, setPasswordErr] = useState({ code: 0, err: '' });
    const [emailErr, setEmailErr] = useState({ code: 0, err: '' });
    const [usernameErr, setUsernameErr] = useState({ code: 0, err: '' });
    const [signupErr, setSignupErr] = useState({ code: 0, err: '' });

    const [addUser, { data, loading, error }] = useMutation(ADD_USER);
    const [usernameExists, { data: usernameExistsBool }] = useMutation(USERNAME_EXISTS);
    const [emailExists, { data: emailExistsBool }] = useMutation(EMAIL_EXISTS);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleFormInput = (e) => {

        const { name, value } = e.target;
        if (name === 'username') return setUsernameVal(value);
        if (name === 'email') return setEmailVal(value);
        if (name === 'password') return setPasswordVal(value);

    }

    const handleFocusOff = (e) => {

        const { name, value } = e.target;
        if (name === 'username') {

            if (value != '') {
                usernameExists({
                    variables: {
                        username: value,
                    }
                });
            } else {
                setUsernameErr({ code: 1, err: 'Username cannot be left blank.' })
            }
            // check if username is taken


        }
        if (name === 'email') {
            const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            console.log('lol');

            if (emailRegExp.test(value)) {
                setEmailErr({ code: 2, err: '✔' });
                //check if email is taken
                emailExists({
                    variables: {
                        email: value,
                    }
                });
            } else if (value === '') {
                setEmailErr({ code: 1, err: 'Email cannot be left blank.' });
            } else {
                setEmailErr({ code: 1, err: 'Email not valid.' });
            }

        }
        if (name === 'password') {
            if (value.length < 8) {
                setPasswordErr({ code: 1, err: 'Must be 8 characters or longer.' });
            } else {
                setPasswordErr({ code: 2, err: '✔' });
            }
        }

    }

    // Set username error code/msg when checking if the username exists in DB
    useEffect(() => {
        if (!usernameExistsBool) return;

        if (!usernameExistsBool.usernameExists) setUsernameErr({ code: 2, err: '✔' })
        else setUsernameErr({ code: 3, err: 'Username already exists' });

    }, [usernameExistsBool]);

    // Set email error code/msg when checking if the email exists in DB
    useEffect(() => {

        if (!emailExistsBool) return;

        if (!emailExistsBool.emailExists) setEmailErr({ code: 2, err: '✔' })
        else setEmailErr({ code: 3, err: 'Email already exists' });

    }, [emailExistsBool]);

    const handleFormSubmit = (e) => {

        e.preventDefault();

        if (usernameErr.code === 2 &&
            emailErr.code === 2 &&
            passwordErr.code === 2) {

            addUser({
                variables: {
                    email: emailVal,
                    username: usernameVal,
                    password: passwordVal,
                }
            });

            setSignupErr({ code: 1, err: 'Signup loading...' });

            props.setModalContent({ type: '' });
            props.setModalActive(0);
            navigate('/');

        } else {
            setSignupErr({ code: 1, err: 'Signup info not valid' });
        }

    }

    return (
        <>

            <form onSubmit={handleFormSubmit}>

                <label htmlFor='username'>Username:</label>
                <input name='username'
                    onChange={handleFormInput}
                    value={usernameVal}
                    onBlur={handleFocusOff}
                    placeholder="xandeisop"
                    className={usernameErr.code === 0 || usernameErr.code === 2 ? 'valid' : 'invalid'} />


                {usernameErr.err}

                <label htmlFor='email'>Email:</label>
                <input name='email'
                    onChange={handleFormInput}
                    value={emailVal}
                    onBlur={handleFocusOff}
                    placeholder="xande@xandedev.com"
                    className={emailErr.code === 0 || emailErr.code === 2 ? 'valid' : 'invalid'} />

                {emailErr.err}

                <label htmlFor='password'>Password:</label>
                <input type="password"
                    name='password'
                    onChange={handleFormInput}
                    onBlur={handleFocusOff}
                    value={passwordVal}
                    className={passwordErr.code === 0 || passwordErr.code === 2 ? 'valid' : 'invalid'} />

                {passwordErr.err}

                <input type='submit' value='Submit' />

                {signupErr.err}

            </form>

        </>
    )
}

export default Signup