import './FriendsDisplay.css'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { LOGIN } from '../../../utils/graphql/mutations'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../utils/auth'
import { GET_USER_DATA } from '../../../utils/graphql/queries'

function FriendsDisplay(props) {

    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_USER_DATA, {
        variables: {
            userId: Auth.getProfile().data._id,
        }
    });

    useEffect(() => {
        if (!data) return;
        console.log(data.userById.friends);
        console.log(data.userById.friends[0].username);
    }, [data]);

    return (
        <>

            <div className='friends-container'>

                {data
                    ? (data.userById.friends.length
                        ? (data.userById.friends.map((friend) =>
                            (<div className='friend-image clickable'>{friend.username}</div>)
                        )) : 'No friends lol.'
                    )
                    : 'Loading...'}

            </div >



        </>
    )
}

export default FriendsDisplay;

