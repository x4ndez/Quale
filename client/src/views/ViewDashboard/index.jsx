import { useOutletContext } from "react-router-dom";

function ViewDashboard(props) {

    const [
        modalActive, setModalActive,
        modalContent, setModalContent
    ] = useOutletContext();

    return (
        <>

            <div id='main-container'>

                <aside>

                    <div
                        id="btn-createroom"
                        className='aside-box clickable'
                        onClick={() => {
                            setModalActive(true);
                            setModalContent('CreateRoom');
                        }}>
                        Create Room
                    </div>

                    <div className='aside-box clickable'>Show All Rooms</div>

                </aside>

            </div>

        </>
    )
}

export default ViewDashboard