import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Auth from '../../../../utils/auth'

function Title(props) {

    const navigate = useNavigate();

    const [authData, setAuthData] = useState(Auth.getProfile())

    useEffect(() => {
        setAuthData(Auth.getProfile());
    }, [props.modalContent]);

    return (
        <>
            <div id="title">

                <div className='nav-container'>

                    <span className='nav-left'>Quale</span>
                    <span className='nav-right'>
                        {authData ? (<>

                            <div
                                onClick={() => navigate(`/friends`)}
                                className='friendRequests'>
                                {authData.data.friendsRequestsCount > 0 ? friendsRequestsCount : '0'}
                            </div>

                            <div className='title-link'
                                onClick={() => navigate(`/profile/${authData.data._id}`)}>{authData.data.username}</div>
                            <button onClick={() => {
                                navigate('/');
                                Auth.logout();

                            }}>Log out</button></>) : (<>
                                <a className='title-link'
                                    onClick={() => {
                                        props.setModalActive(1);
                                        props.setModalContent({ type: 'Login' });
                                    }}>Login</a>
                                <a className='title-link'
                                    onClick={() => {
                                        props.setModalActive(1);
                                        props.setModalContent({ type: 'Signup' });
                                    }}>Signup</a>

                            </>)}

                    </span>
                </div>

            </div>
        </>
    )
}

export default Title
