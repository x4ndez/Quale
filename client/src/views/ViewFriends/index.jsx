import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_DATA } from '../../../utils/graphql/queries';
import Auth from '../../../utils/auth'
import { useNavigate, useParams } from 'react-router-dom';

function ViewFriends() {

    const { data: userData } = useQuery(GET_USER_DATA, {
        variables: {
            userId: Auth.getProfile().data._id,
        }
    })

    useEffect(() => {
        if (!userData) return;

        console.log(userData);

    }, [userData]);

    return (
        <>
            <h1>Friend Requests:</h1>
            {userData
                ? (
                    userData.userById.friendRequests.map((user) =>
                    (
                        <div>{user.username}</div>
                    ))
                )
                : 'Loading...'}


        </>
    )
}

export default ViewFriends
