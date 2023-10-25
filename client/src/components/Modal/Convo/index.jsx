import './Convo.css'
import { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { GET_CONVO } from "../../../../utils/graphql/queries"
import { socket } from '../../../config/socket'
import Auth from '../../../../utils/auth'

function Convo(props) {

    // console.log(Auth.getProfile().data._id);

    const [msgInputVal, setMsgInputVal] = useState('');
    const [queryData, setQueryData] = useState();
    const [chatLog, setChatLog] = useState([]);

    const { loading, error, data } = useQuery(GET_CONVO, {
        variables: {
            convoId: props.modalContent.feedback.convoId,
        }
    });

    // useEffect(() => {

    //     socket.connect();

    //     socket.emit('create', 'PLACEHOLDER');

    //     socket.on('chat', (socket) => {
    //         setChatLog([...chatLog, socket]);
    //     });

    //     return () => {
    //         socket.disconnect();
    //     }

    // }, [data]);



    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onChatEvent(value) {
            setChatLog([...chatLog, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat', onChatEvent);

        socket.emit('create', 'placeholder');

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chat', onChatEvent);
        };
    }, []);

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
            userId: Auth.getProfile().data._id,
            commentContent: msgInputVal,
        };

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

                            {data.convoById.comments.length ? 'x' : 'Start the conversation!'}
                            {/* {chatLog.map((comment) => {
                                    (<div>{comment.commentContent}</div>)
                                })} */}
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