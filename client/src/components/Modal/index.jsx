import './Modal.css'

import { socket } from '../../config/socket'

import CreateRoom from './CreateRoom'
import Convo from './Convo'
import Login from './Login'
import Signup from './Signup'
import PrivateConvo from './PrivateConvo'

function Modal(props) {

    // Render the modal content and serve any feedback data through props
    const handleModalContent = () => {

        if (props.modalContent.type === 'CreateRoom') return <CreateRoom {...props} />;
        if (props.modalContent.type === 'Convo') return <Convo {...props} />;
        if (props.modalContent.type === 'Login') return <Login {...props} />;
        if (props.modalContent.type === 'Signup') return <Signup {...props} />;
        if (props.modalContent.type === 'PrivateConvo') return <PrivateConvo {...props} />;
        return '';

    }

    return (
        <>

            <div id='modal' className={props.modalActive ? 'modal-active' : 'modal-inactive'}>

                <div id='modal-blockout' className='flex-center-vh'>

                    <div id='modal-container' className='flex-center-vh'>

                        <div id='modal-exit' className='clickable' onClick={() => {
                            socket.disconnect();
                            props.setModalActive(false);
                            props.setModalContent('');
                        }}>X</div>

                        {handleModalContent()}


                    </div>

                </div>

            </div>

        </>
    )
}

export default Modal
