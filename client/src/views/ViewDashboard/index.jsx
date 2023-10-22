import ReactDOM from 'react-dom/client'
import Modal from '../../components/Modal'

function ViewDashboard() {

    function openModal() {

        const modal = document.getElementById('modal');

        modal.style.display = 'block';

        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50)

    }

    return (
        <>

            <div id='main-container'>

                <aside>

                    <div
                        id="btn-createroom"
                        className='aside-box clickable'
                        onClick={openModal}>
                        Create Room
                    </div>

                    <div className='aside-box clickable'>Show All Rooms</div>

                </aside>

            </div>

        </>
    )
}

export default ViewDashboard
