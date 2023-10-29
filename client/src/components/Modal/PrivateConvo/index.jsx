import './Convo.css'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_CONVO, GET_USER_DATA } from "../../../../utils/graphql/queries"
import { socket } from '../../../config/socket'
import Auth from '../../../../utils/auth'
import UserSelect from './UserSelect'
import { ADD_COMMENT } from '../../../../utils/graphql/mutations'

//

import { INITIATE_PRIVATE_CONVO, ADD_COMMENT_PRIVATE_CONVO } from '../../../../utils/graphql/mutations'

function PrivateConvo(props) {

    const [msgInputVal, setMsgInputVal] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [userSelect, setUserSelect] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [privateConvoData, setPrivateConvoData] = useState();

    const [initiatePrivateConvo, { data: initiateData }] = useMutation(INITIATE_PRIVATE_CONVO);
    const [addCommentPrivateConvo] = useMutation(ADD_COMMENT_PRIVATE_CONVO);

    useEffect(() => {
        initiatePrivateConvo({
            variables: {
                userId: Auth.getProfile().data._id,
                friendId: props.modalContent.feedback.reqUserId,
            }
        });
    }, []);

    useEffect(() => {
        if (!initiateData) return;
        setPrivateConvoData(initiateData.initiatePrivateConvo);
    }, [initiateData]);

    useEffect(() => {
        console.log(privateConvoData);
    }, [privateConvoData]);

    useEffect(() => {

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onChatEvent(value) {
            setChatLog(chatLog => [...chatLog, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat', onChatEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chat', onChatEvent);
        };

    }, []);

    useEffect(() => {
        if (!privateConvoData) return;
        socket.emit('open', privateConvoData._id);
        setChatLog([...privateConvoData.comments]);
    }, [privateConvoData]);

    useEffect(() => {
        console.log(chatLog);
    }, [chatLog]);

    const handleFormInput = (e) => {

        const { name, value } = e.target;
        if (name === 'msgInput') return setMsgInputVal(value);

    }

    const handleFormSubmit = (e) => {

        e.preventDefault();

        const comment = {
            createdBy: {
                _id: Auth.getProfile().data._id,
                username: Auth.getProfile().data.username
            },
            comment: msgInputVal,
        };

        console.log(comment)

        addCommentPrivateConvo({
            variables: {
                convoId: privateConvoData._id,
                commentContent: comment.comment,
                createdBy: comment.createdBy._id,
            }
        });

        socket.emit('chat', comment);

        setMsgInputVal('');

    }

    return (

        <>

            {
                privateConvoData
                    ? (
                        <div className='convo-container'>

                            <h1>Private Convo</h1>

                            <div className='convo-main'>

                                {privateConvoData.comments.length > 0
                                    ? <>
                                        {chatLog.map((comment, i) =>
                                        (<ul key={i}><span id={i} className='username clickable' onClick={() => userSelect === i ? setUserSelect() : setUserSelect(i)}>
                                            {comment.createdBy.username}
                                            {userSelect === i ? (<UserSelect props={comment} modalProps={props} />) : ''}
                                        </span> said: {comment.comment}</ul>)
                                        )}
                                    </>
                                    : 'Start the conversation!'
                                }



                            </div>

                            <form className='convo-input'
                                onSubmit={handleFormSubmit}
                            >

                                <input
                                    type='text'
                                    name='msgInput'
                                    onChange={handleFormInput}
                                    value={msgInputVal}
                                />
                                <input
                                    type='submit'
                                    value='Send'
                                />

                            </form>

                        </div>

                    )
                    : 'Loading...'}

        </>
    )
}

export default PrivateConvo;