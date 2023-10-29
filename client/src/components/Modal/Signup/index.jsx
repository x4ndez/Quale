import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../../../utils/graphql/mutations'

function Signup(props) {

    const [usernameVal, setUsernameVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    // 0 = default, 1 = error, 2 = ok
    const [passwordErr, setPasswordErr] = useState({ code: 0, err: '' });
    const [emailErr, setEmailErr] = useState({ code: 0, err: '' });
    const [usernameErr, setUsernameErr] = useState({ code: 0, err: '' });
    const [signupErr, setSignupErr] = useState({ code: 0, err: '' });

    const [addUser, { data, loading, error }] = useMutation(ADD_USER);

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

            setUsernameErr({ code: 2, err: '✔' });
            //check if password is taken

        }
        if (name === 'email') {
            const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (emailRegExp.test(value)) {
                setEmailErr({ code: 2, err: '✔' });
            } else {
                setEmailErr({ code: 1, err: 'Email not valid.' });
            }
            //check if email is taken
        }
        if (name === 'password') {
            if (value.length < 8) {
                setPasswordErr({ code: 1, err: 'Must be 8 characters or longer.' });
            } else {
                setPasswordErr({ code: 2, err: '✔' });
            }
        }

    }

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

            return props.setModalContent({ type: 'Login' });

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
                    placeholder="xandeisop" />

                {usernameErr.err}

                <label htmlFor='email'>Email:</label>
                <input name='email'
                    onChange={handleFormInput}
                    value={emailVal}
                    onBlur={handleFocusOff}
                    placeholder="xande@xandedev.com" />

                {emailErr.err}

                <label htmlFor='password'>Password:</label>
                <input type="password"
                    name='password'
                    onChange={handleFormInput}
                    onBlur={handleFocusOff}
                    value={passwordVal} />

                {passwordErr.err}

                <input type='submit' value='Submit' />

                {signupErr.err}

            </form>

        </>
    )
}

export default Signup