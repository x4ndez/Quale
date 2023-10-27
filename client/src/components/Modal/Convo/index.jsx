import './Convo.css'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_CONVO, GET_USER_DATA } from "../../../../utils/graphql/queries"
import { socket } from '../../../config/socket'
import Auth from '../../../../utils/auth'
import UserSelect from './UserSelect'
import { ADD_COMMENT } from '../../../../utils/graphql/mutations'

function Convo(props) {

    // console.log(Auth.getProfile().data._id);

    const [msgInputVal, setMsgInputVal] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [userSelect, setUserSelect] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);

    const [addCommentToConvo] = useMutation(ADD_COMMENT);

    const { loading, error, data } = useQuery(GET_CONVO, {
        variables: {
            convoId: props.modalContent.feedback.convoId,
        },
    });

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
        if (!data) return;

        socket.emit('open', data.convoById.roomName);
        setChatLog([...data.convoById.comments]);
    }, [data]);

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

        // $convoId: ID!, $commentContent: String!, $createdBy: ID!
        addCommentToConvo({
            variables: {
                convoId: props.modalContent.feedback.convoId,
                commentContent: comment.comment,
                createdBy: comment.createdBy._id,
            }
        });

        socket.emit('chat', comment);

        setMsgInputVal('');

    }

    return (

        <>

            {data ? (

                <>

                    <div className='convo-container'>

                        <h1>{data.convoById.roomName}</h1>

                        <div className='convo-main'>

                            {data.convoById.comments.length > 0
                                ? <>
                                    {chatLog.map((comment, i) =>
                                    (<ul key={i}><span id={i} className='username clickable' onClick={() => userSelect === i ? setUserSelect() : setUserSelect(i)}>
                                        {comment.createdBy.username}
                                        {userSelect === i ? (<UserSelect props={comment} />) : ''}
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

                </>

            ) : 'Loading...'}

        </>
    )
}

export default Convo