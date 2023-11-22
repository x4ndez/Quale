import './UserSelect.css'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Auth from '../../../../../utils/auth'
import { REMOVE_FRIEND, ADD_FRIEND_REQUEST } from '../../../../../utils/graphql/mutations';
import { GET_USER_DATA } from '../../../../../utils/graphql/queries';
import { useNavigate } from 'react-router-dom';

function UserSelect(props) {

    const navigate = useNavigate();

    const [addFriendRequest] = useMutation(ADD_FRIEND_REQUEST);
    const [removeFriend] = useMutation(REMOVE_FRIEND);
    const { data, loading, error } = useQuery(GET_USER_DATA, {
        variables: {
            userId: Auth.getProfile().data._id,
        }
    });

    const [commentData, setCommentData] = useState(props);
    const [friendStatus, setFriendStatus] = useState()

    // console.log(props.comment.createdBy._id);

    function isFriend() {

        const myUserId = data.userById._id;
        const myFriends = data.userById.friends;
        const yourUserId = commentData.props.createdBy._id;

        const status = myFriends.find((friend) => friend._id === yourUserId)
        if (status === undefined) return false

        return true;

    }

    useEffect(() => {
        if (!data) return;
        setFriendStatus(isFriend());
    }, [data]);

    return (
        <>

            {data ? (

                <div className='user-options'>

                    {friendStatus
                        ? (<ul onClick={() => removeFriend({
                            variables: {
                                userId: data.userById._id, friendId: commentData.props.createdBy._id,
                            }
                        })}>Remove Friend</ul>)
                        : (<ul onClick={() => addFriendRequest({
                            variables: {
                                userId: data.userById._id, friendId: commentData.props.createdBy._id,
                            }
                        })}>Add Friend</ul>)}
                    <ul onClick={() => {
                        props.modalProps.setModalActive(0);
                        props.modalProps.setModalContent({ type: '' });
                        navigate(`/profile/${commentData.props.createdBy._id}`)
                    }}>Profile</ul>
                    <ul onClick={() => {
                        props.modalProps.setModalActive(1);
                        props.modalProps.setModalContent({
                            type: 'PrivateConvo',
                            feedback: {
                                reqUserId: commentData.props.createdBy._id
                            }
                        });
                    }}>Private Message</ul>

                </div >

            ) : 'Loading...'
            }



        </>
    )
}

export default UserSelect