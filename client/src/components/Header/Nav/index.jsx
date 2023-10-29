import { Link } from 'react-router-dom'
import { useState } from 'react'
import Auth from '../../../../utils/auth'

function Nav(props) {

    const [authData, setAuthData] = useState(Auth.getProfile())

    return (
        <>
            <nav>

                <a onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent({ type: 'Login' });
                }}>Login</a> /
                <a onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent({ type: 'Signup' });
                }}>Signup</a>
                {authData ? (<Link to='/dashboard'>Dashboard</Link>) : ''}
                {authData ? (<Link to='/account'>Account</Link>) : ''}


            </nav>
        </>
    )
}

export default Nav
