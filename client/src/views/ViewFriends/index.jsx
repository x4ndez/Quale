import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_DATA } from '../../../utils/graphql/queries';
import { ADD_FRIEND, REMOVE_FRIEND, REMOVE_FRIEND_REQUEST } from '../../../utils/graphql/mutations';
import Auth from '../../../utils/auth'
import { useNavigate, useParams } from 'react-router-dom';

function ViewFriends() {

    const { data: userData } = useQuery(GET_USER_DATA, {
        variables: {
            userId: Auth.getProfile().data._id,
        }
    })

    const [addFriend] = useMutation(ADD_FRIEND);
    const [removeFriendRequest] = useMutation(REMOVE_FRIEND_REQUEST);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) return;

        console.log(userData);

    }, [userData]);

    return (
        <>

            {userData
                ? (<>
                    <h1>Friend Requests:</h1>

                    {userData.userById.friendRequests.length > 0
                        ? (userData.userById.friendRequests.map((user) =>
                        (<div>
                            <div>{user.username}</div>
                            <div onClick={() => addFriend({
                                variables: {
                                    userId: Auth.getProfile().data._id,
                                    friendId: user._id,
                                }
                            })}>Accept</div>
                            <div onClick={() => removeFriendRequest({
                                variables: {
                                    userId: Auth.getProfile().data._id,
                                    friendId: user._id,
                                }
                            })}>Deny</div>
                        </div>
                        )))
                        : "No friend requests. No one wants to be your friend."
                    }

                    { }
                    <h1>Friends:</h1>

                    <div class='friends-container'>
                        {userData.userById.friends.length > 0
                            ? (
                                userData.userById.friends.map((user, i) =>
                                (<div key={i}
                                    className='friend-image clickable'
                                    onClick={() => navigate(`/profile/${user._id}`)}>{user.username}</div>))
                            )
                            : "No friends lol"}
                    </div>
                </>)
                : 'Loading...'}



        </>
    )
}

export default ViewFriends
