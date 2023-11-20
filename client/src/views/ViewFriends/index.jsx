import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_INFO } from '../../../utils/graphql/queries';
import Auth from '../../../utils/auth'
import { useNavigate, useParams } from 'react-router-dom';

function ViewFriends() {

    const { data: userData } = useQuery(GET_USER_INFO, {
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
            Friends
        </>
    )
}

export default ViewFriends
