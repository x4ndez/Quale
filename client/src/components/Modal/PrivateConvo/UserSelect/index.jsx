import './UserSelect.css'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Auth from '../../../../../utils/auth'
import { ADD_FRIEND } from '../../../../../utils/graphql/mutations';
import { GET_USER_DATA } from '../../../../../utils/graphql/queries';
import { useNavigate } from 'react-router-dom';

function UserSelect(props) {

    console.log(props.modalProps.setModalContent);

    const navigate = useNavigate();

    const [addFriend] = useMutation(ADD_FRIEND);
    const { data, loading, error } = useQuery(GET_USER_DATA, {
        variables: {
            userId: Auth.getProfile().data._id,
        }
    });

    const [commentData, setCommentData] = useState(props);

    // console.log(props.comment.createdBy._id);

    function isFriend() {

        // const myUserId = data.userById._id;
        // const myFriends = data.userById.friends;
        // const yourUserId = commentData.props.createdBy._id;

        // console.log(yourUserId);
        // console.log(myFriends._id);
        // console.log(myFriends.forEach((myFriend) => {
        //     if (myFriend._id === yourUserId) return true;
        // }));

        // if (myFriends.includes({ _id: yourUserId })) {
        //     console.log(true);
        //     return true;
        // }
        // console.log(false);
        return false;


    }

    return (
        <>

            {data ? (

                <div className='user-options'>

                    {isFriend()
                        ? (<ul>Remove Friend</ul>)
                        : (<ul onClick={() => addFriend({
                            variables: {
                                userId: data.userById._id, friendId: commentData.props.createdBy._id,
                            }
                        })}>Add Friend</ul>)}
                    <ul onClick={() => {
                        props.modalProps.setModalActive(0);
                        props.modalProps.setModalContent({ type: '' });
                        navigate(`/profile/${commentData.props.createdBy._id}`)
                    }}>Profile</ul>

                </div >

            ) : 'Loading...'
            }



        </>
    )
}

export default UserSelect