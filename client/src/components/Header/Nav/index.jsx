import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Auth from '../../../../utils/auth'

function Nav(props) {

    const [authData, setAuthData] = useState(Auth.getProfile())

    useEffect(() => {
        setAuthData(Auth.getProfile());
    }, [props.modalContent]);

    return (
        <>
            <nav>

                <div className='nav-container'>

                    <span className='nav-left'></span>
                    <span className='nav-right'>
                        {authData ? (<Link to='/dashboard' className='nav-link'>Dashboard</Link>) : ''}
                        {authData ? (<Link to='/account' className='nav-link'>Account</Link>) : ''}

                    </span>
                </div>

            </nav>
        </>
    )
}

export default Nav
