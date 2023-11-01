import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_INFO } from '../../../utils/graphql/queries';
import Auth from '../../../utils/auth'
import { UPDATE_INFO, UPDATE_INTERESTS } from '../../../utils/graphql/mutations';
import { useNavigate, useParams } from 'react-router-dom';

function ViewProfile() {

    const navigate = useNavigate();
    const { userId } = useParams();

    const { loading, error, data } = useQuery(GET_USER_INFO, {
        variables: {
            userId: userId, //ID FROM PARAMS
        }
    });

    useEffect(() => {
        if (!data) return;
        console.log(data);
    }, [data]);

    return (
        // <></>
        <>

            <main className='flex-center-h'>

                {data ? (

                    <div id='main-container'>

                        <h1>{data.userById.username}</h1>

                        <h2>About</h2>

                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{data.userById.info.name}</td>

                                    <td>Phone</td>
                                    <td>{data.userById.info.phone}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{data.userById.info.city}</td>

                                    <td>Country</td>
                                    <td>{data.userById.info.country}</td>
                                </tr>
                            </tbody>

                        </table >

                        <h2>Interests</h2>

                        {data.userById.interests.length
                            ?
                            data.userById.interests.map((interest, i) =>
                            (<ul
                                key={i}
                                className='interest'>

                                <span>{interest}</span>

                            </ul>)
                            )
                            : 'This person has no interests.'
                        }



                    </div >

                ) : 'Loading...'}

            </main>

        </>

    )

}

export default ViewProfile;