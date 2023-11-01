import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"
import { useQuery } from '@apollo/client'
import Auth from '../../../utils/auth'
import { GET_RECENT_CONVOS } from '../../../utils/graphql/queries'

import ChatPreview from '../../components/ChatPreview'
import FriendsDisplay from '../../components/FriendsDisplay'

function ViewDashboard(props) {

    const [
        modalActive, setModalActive,
        modalContent, setModalContent
    ] = useOutletContext();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [recentConvos, setRecentConvos] = useState();

    const { loading, error, data } = useQuery(GET_RECENT_CONVOS);

    useEffect(() => {
        setIsLoggedIn(Auth.loggedIn());
        if (Auth.getProfile() === undefined) setIsLoggedIn(false);
    }, []);

    useEffect(() => {
        setRecentConvos(data);
    }, [data]);

    return (
        <>
            <main className='flex-center-h'>

                {isLoggedIn ? (

                    <div id='main-container'>

                        <aside>

                            <div
                                id="btn-createroom"
                                className='aside-box clickable'
                                onClick={() => {
                                    setModalActive(true);
                                    setModalContent({ type: 'CreateRoom' });
                                }}>
                                Create Room
                            </div>

                            <div>Recent Convos:</div>

                            {recentConvos ? recentConvos.convosRecent.map((convo, i) =>
                            (<ChatPreview key={i}
                                convoData={convo}
                                setModalActive={setModalActive}
                                setModalContent={setModalContent} />)
                            ) : 'Loading...'}

                            <div className='aside-box clickable'>Show All Rooms</div>

                        </aside>

                        <section>

                            <FriendsDisplay />

                        </section>

                    </div>


                ) : ('not logged in')}
            </main>

        </>
    )
}

export default ViewDashboard