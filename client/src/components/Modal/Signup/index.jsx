import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../../../utils/graphql/mutations'

function Signup(props) {

    const [usernameVal, setUsernameVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [emailVal, setEmailVal] = useState('');

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

    const handleFormSubmit = (e) => {

        e.preventDefault();

        addUser({
            variables: {
                email: emailVal,
                username: usernameVal,
                password: passwordVal,
            }
        });

        return props.setModalContent('Login');

    }

    return (
        <>

            <form onSubmit={handleFormSubmit}>

                <label htmlFor='username'>Username:</label>
                <input name='username'
                    onChange={handleFormInput}
                    value={usernameVal}
                    placeholder="xandeisop" />

                <label htmlFor='email'>Email:</label>
                <input name='email'
                    onChange={handleFormInput}
                    value={emailVal}
                    placeholder="xande@xandedev.com" />

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

export default Signup