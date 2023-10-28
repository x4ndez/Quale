import './FriendsDisplay.css'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { LOGIN } from '../../../utils/graphql/mutations'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../utils/auth'

function FriendsDisplay(props) {

    const navigate = useNavigate();
    const {data, loading, error} = useQuery();

    return (
        <>

            <div className='friends-container'>

                <div className='friend-image'>Friend</div>

            </div>

        </>
    )
}

export default FriendsDisplay;