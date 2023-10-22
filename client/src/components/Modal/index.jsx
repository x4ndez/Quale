import './Modal.css'

import CreateRoom from './CreateRoom'
import Convo from './Convo'

function Modal() {

    function closeModal() {

        const modal = document.getElementById('modal');

        modal.style.opacity = '0';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 1000)

    }

    return (
        <>

            <div id='modal'>

                <div id='modal-blockout' className='flex-center-vh'>

                    <div id='modal-container' className='flex-center-vh'>

                        <div id='modal-exit' className='clickable' onClick={closeModal}>X</div>

                        <form>

                            <label for='roomName'>Room Name:</label>
                            <input id='roomName' placeholder="Xande's Room" />
                            <input type='submit' id='btnCreateRoom' value='Create Room' />

                        </form>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Modal
