import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_USER_DATA } from '../../../../utils/graphql/queries';
import Auth from '../../../../utils/auth'

function Title(props) {

    const navigate = useNavigate();

    //USE LAZY QUERY IF THERE'S AUTH DATA!
    const [getUserData, { data: userData }] = useLazyQuery(GET_USER_DATA);

    const [authData, setAuthData] = useState(Auth.getProfile())

    useEffect(() => {
        if (!authData) return;
        getUserData({
            variables: {
                userId: Auth.getProfile().data._id,
            }
        });
    }, [authData]);

    useEffect(() => {
        setAuthData(Auth.getProfile());
    }, [props.modalContent]);

    // useEffect(() => {
    //     if (!userData) return;

    //     console.log(userData.userById.friendsRequestCount);

    // }, [userData]);

    return (
        <>
            <div id="title">

                <div className='nav-container'>

                    <span className='nav-left'>Quale</span>
                    <span className='nav-right'>
                        {Auth.getProfile()
                            ? userData
                                ? (<>
                                    <div
                                        onClick={() => navigate(`/friends`)}
                                        className='friendRequests'>
                                        {userData.userById.friendsRequestCount > 0 ? userData.userById.friendsRequestCount : '0'}
                                    </div>

                                    <div className='title-link'
                                        onClick={() => navigate(`/profile/${userData.userById._id}`)}>{userData.userById.username}</div>
                                    <button onClick={() => {
                                        navigate('/');
                                        Auth.logout();

                                    }}>Log out</button>
                                </>)
                                : ""

                            : (<>
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
