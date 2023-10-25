import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"
import Auth from '../../../utils/auth'

function ViewDashboard(props) {

    const [
        modalActive, setModalActive,
        modalContent, setModalContent
    ] = useOutletContext();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(Auth.loggedIn());
        if (Auth.getProfile() === undefined) setIsLoggedIn(false);
    }, []);

    return (
        <>

            {isLoggedIn ? (

                <div id='main-container'>

                    <aside>

                        <div
                            id="btn-createroom"
                            className='aside-box clickable'
                            onClick={() => {
                                setModalActive(true);
                                setModalContent('CreateRoom');
                            }}>
                            Create Room
                        </div>

                        <div className='aside-box clickable'>Show All Rooms</div>

                    </aside>

                </div>


            ) : ('not logged in')}


        </>
    )
}

export default ViewDashboard