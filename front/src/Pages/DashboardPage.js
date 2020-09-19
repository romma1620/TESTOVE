import React from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import makeToast from "../Toaster";

const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const chatroomNameRef = React.createRef();

    const createChatrooms = () => {
        const name = chatroomNameRef.current.value;

        axios
            .post('http://localhost:1616/api/chat', {
                name,
            })
            .then(response => {
                makeToast('success', response.data.message)
                window.location.reload(false);
            })
            .catch(err => {
                makeToast('error', err.data.message);
            })
    }

    const getChatrooms = () => {
        axios
            .get('http://localhost:1616/api/chat', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Chat_Token')}`
                }

            })
            .then(response => {
                setChatrooms(response.data);

            })
            .catch(err => {
                makeToast('error', err.response.data.message);
            })
    };
    
    React.useEffect(()=>{
        getChatrooms();
    }, [])

    return <div className='card'>
        <div className='cardHeader'>
            Create Chatroom
        </div>
        <div className='cardBody'>
            <div className='inputGroup'>
                <label htmlFor='chatroomName'>Chatroom Name</label>
                <input
                    type='text'
                    name='chatroomName'
                    id='chatroomName'
                    placeholder='Ant Chatroom'
                    ref={chatroomNameRef}
                />
            </div>
            <button onClick={createChatrooms}>Create</button>
            <div className='chatrooms'>
                {chatrooms.map((chatroom) => (
                    <div key={chatroom._id} className='chatroom'>
                        <div>{chatroom.name}</div>
                        <Link to={`/chatroom/${chatroom._id}`}>
                            <div className='join'>Join</div>
                        </Link>
                    </div>
                    )
                )}
            </div>
        </div>
    </div>;
}

export default DashboardPage;
