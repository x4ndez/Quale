import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CONVO } from '../../../../utils/graphql/mutations'
import Auth from '../../../../utils/auth'

function CreateRoom(props) {

    const [roomNameVal, setRoomNameVal] = useState('');

    // console.log(Auth.getProfile().data._id);

    const [addConvo, { data, loading, error }] = useMutation(ADD_CONVO);

    const handleFormInput = (e) => {

        const { value } = e.target;
        return setRoomNameVal(value);

    }

    const handleFormSubmit = (e) => {

        e.preventDefault();

        addConvo({
            variables: {
                roomName: roomNameVal,
                createdBy: Auth.getProfile().data._id,
            }
        });

        props.setModalActive(0);

        window.location.reload(false);

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
