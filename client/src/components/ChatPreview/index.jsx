import './ChatPreview.css'

function ChatPreview(props) {

    return (
        <>
            <div
                className='previewBox clickable flex-center-vh'
                onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent('Convo');
                }}>
                {props.convoData.roomName}
            </div>
        </>
    )
}

export default ChatPreview
