import { useState } from 'react'

function CreateRoom(props) {

    const [roomNameVal, setRoomNameVal] = useState('');

    const handleFormInput = (e) => {

        const { value } = e.target;
        return setRoomNameVal(value);

    }

    const handleFormSubmit = (e) => {

        e.preventDefault();
        return props.setModalContent('Convo');

    }

    return (
        <>

            <form onSubmit={handleFormSubmit}>

                <label htmlFor='roomName'>Room Name:</label>
                <input name='roomName'
                    onChange={handleFormInput}
                    value={roomNameVal}
                    placeholder="Xande's Room" />
                <input type='submit' value='Create Room' />

            </form>

        </>
    )
}

export default CreateRoom
