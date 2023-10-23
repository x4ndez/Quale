function CreateRoom() {

    return (
        <>

            <form>

                <label htmlFor='roomName'>Room Name:</label>
                <input id='roomName' placeholder="Xande's Room" />
                <input type='submit' id='btnCreateRoom' value='Create Room' />

            </form>

        </>
    )
}

export default CreateRoom
