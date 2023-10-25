import './ChatPreview.css'

function ChatPreview(props) {



    const previewFeedback = {
        convoId: props.convoData._id
    }

    return (
        <>
            <div
                className='previewBox clickable flex-center-vh'
                onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent({ type: 'Convo', feedback: previewFeedback });
                }}>
                {props.convoData.roomName}
            </div>
        </>
    )
}

export default ChatPreview
