import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_DATA } from '../../../utils/graphql/queries';
import { ADD_FRIEND, REMOVE_FRIEND } from '../../../utils/graphql/mutations';
import Auth from '../../../utils/auth'
import { useNavigate, useParams } from 'react-router-dom';

function ViewFriends() {

    const { data: userData } = useQuery(GET_USER_DATA, {
        variables: {
            userId: Auth.getProfile().data._id,
        }
    })

    const [addFriend] = useMutation(ADD_FRIEND);

    useEffect(() => {
        if (!userData) return;

        console.log(userData);

    }, [userData]);

    return (
        <>

            {userData
                ? (<>
                    <h1>Friend Requests:</h1>
                    {userData.userById.friendRequests.map((user) =>
                    (<div>
                        <div>{user.username}</div>
                        <div onClick={() => addFriend({
                            variables: {
                                userId: Auth.getProfile().data._id,
                                friendId: user._id,
                            }
                        })}>Accept</div>
                        <div>Deny</div>
                    </div>
                    ))}
                    <h1>Friends:</h1>
                    {userData.userById.friends.length > 0
                        ? (
                            userData.userById.friends.map((user, i) =>
                                (<div key={i}>{user.username}</div>))
                        )
                        : "No friends lol"}

                </>)
                : 'Loading...'}



        </>
    )
}

export default ViewFriends
