import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../../utils/graphql/mutations'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../../utils/auth'

function Login(props) {

    const [usernameVal, setUsernameVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

    const [login, { data, loading, error }] = useMutation(LOGIN);

    const navigate = useNavigate();

    useEffect(() => {

        if (data) {
            console.log('login success');
            // console.log(data.login.token);
            Auth.login(data.login.token);
            props.setModalActive(0);
            navigate('/dashboard');
        } else {
            console.log('login failure');
            
            navigate('/');
        }

    }, [data]);

    const handleFormInput = (e) => {

        const { name, value } = e.target;
        if (name === 'username') return setUsernameVal(value);
        if (name === 'password') return setPasswordVal(value);

    }

    const handleFormSubmit = (e) => {

        e.preventDefault();

        login({
            variables: {
                username: usernameVal,
                password: passwordVal,
            }
        });

    }

    return (
        <>

            <form onSubmit={handleFormSubmit}>

                <label htmlFor='username'>Username:</label>
                <input name='username'
                    onChange={handleFormInput}
                    value={usernameVal}
                    placeholder="xandeisop" />

                <label htmlFor='password'>Password:</label>
                <input type="password"
                    name='password'
                    onChange={handleFormInput}
                    value={passwordVal} />

                <input type='submit' value='Submit' />

            </form>

        </>
    )
}

export default Login