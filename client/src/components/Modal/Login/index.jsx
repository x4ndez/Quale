import { useState } from 'react'

function Login(props) {

    const [usernameVal, setUsernameVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [emailVal, setEmailVal] = useState('');

    const handleFormInput = (e) => {

        const { name, value } = e.target;
        if(name === 'username') return setUsernameVal(value);
        if(name === 'password') return setPasswordVal(value);

}

const handleFormSubmit = (e) => {

    e.preventDefault();
    return props.setModalContent('Convo');

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