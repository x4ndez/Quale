import { useState, useEffect } from 'react'

function ViewAccount() {

    const [editAbout, setEditAbout] = useState(false);
    // PULL ALL INTERESTS FROM DB
    const [abName, setAbName] = useState('');
    const [abPhone, setAbPhone] = useState('');
    const [abCity, setAbCity] = useState('');
    const [abCountry, setAbCountry] = useState('');

    const [interests, setInterests] = useState([]);
    const [intEdit, setIntEdit] = useState(false);
    const [intEditVal, setIntEditVal] = useState('');

    const [intFocus, setIntFocus] = useState(false);

    const handleInput = (e) => {

        const { name, value } = e.target;

        if (name === 'abName') return setAbName(value);
        if (name === 'abPhone') return setAbPhone(value);
        if (name === 'abCity') return setAbCity(value);
        if (name === 'abCountry') return setAbCountry(value);
        if (name === 'intEdit') return setIntEditVal(value);

    }

    const focusHandler = (i) => {

        console.log(i)

    }

    useEffect(() => {
        console.log(interests);
    }, [interests]);

    useEffect(() => {
        console.log(intFocus);
    }, [intFocus]);

    return (
        <>

            <div id='main-container'>

                <h1>Name</h1>

                <h2>About <button onClick={() => setEditAbout(true)}>Edit</button></h2>
                <table>

                    <tr>

                        <td>Name</td>
                        {editAbout
                            ? (
                                <input type='text' name='abName' value={abName} onChange={handleInput} />
                            )
                            : (

                                <td>{abName}</td>

                            )}

                        <td>Phone</td>
                        {editAbout
                            ? (<>
                                <input type='text' name='abPhone' value={abPhone} onChange={handleInput} />
                            </>)
                            : (

                                <td>{abPhone}</td>

                            )}

                    </tr>

                    <tr>

                        <td>City</td>
                        {editAbout
                            ? (
                                <input type='text' name='abCity' value={abCity} onChange={handleInput} />
                            )
                            : (

                                <td>{abCity}</td>

                            )}

                        <td>Country</td>
                        {editAbout
                            ? (
                                <input type='text' name='abCountry' value={abCountry} onChange={handleInput} />
                            )
                            : (

                                <td>{abCountry}</td>

                            )}

                    </tr>

                    {editAbout
                        // SUBMIT TO DB
                        ? (
                            <button onClick={() => setEditAbout(false)}>😊</button>
                        )
                        : ('')}



                </table >

                <h2>Interests <button onClick={() => setIntEdit(true)}>+</button></h2>

                {intEdit ? (

                    <>
                        <div>
                            <input type='text' name='intEdit' value={intEditVal} onChange={handleInput} placeholder='2001 Style Forums' />
                            <button onClick={() => {
                                setIntEdit(false);
                                setInterests([...interests, intEditVal]);
                                setIntEditVal('');
                            }}>😊</button>
                        </div>

                    </>

                ) : ''}

                {interests.length
                    ?
                    interests.map((interest, i) =>
                    (<ul
                        key={i}
                        className='interest'
                        onMouseEnter={() => setIntFocus(true)}
                        onMouseLeave={() => setIntFocus(false)}>

                        <span>{interest}</span>

                        {intFocus
                            ? (
                                <button onClick={(e) => {
                                    setIntFocus(false);
                                    setInterests(interests.filter((item) => {
                                        return item != interest;
                                    }));


                                }}>X</button>
                            )
                            : ''}

                    </ul>)
                    )
                    : 'You have no interests... boring. Click the "+" above to add some things you like!'
                }



            </div >

        </>
    )
}

export default ViewAccount

// Change Password
// Delete Account