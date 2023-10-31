import './ViewIndex.css'
import Signup from '../../components/Modal/Signup'

function ViewIndex() {

    return (
        <>
            <div id='splash' className='index-container'>

                <div className='index-slides index-slide-01'>

                    <h1>Quale</h1>

                    <h2>Making fetch happen since 2001</h2>

                </div>
                <div id='splash-login' className='index-slides index-slide-02'>


                    <Signup />

                </div>

            </div>
        </>
    )
}

export default ViewIndex
