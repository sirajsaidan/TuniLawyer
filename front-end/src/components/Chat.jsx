import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Axios from 'axios';
const Message = ({ info }) => {
    return <div>{info.content}</div>
}
const Chat = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [params, setParams] = useState({
        message: '',
        messages: [],
        currentPage: 0,
        total: 0,
        pageCount: 0,
        resFrom: 0,
        resTo: 0,
        loading: true,
    });
    const handleMessage = ({ target: { value } }) => setParams({ ...params, message: value });
    const {
        message,
        messages,
        currentPage,
        total,
        pageCount,
        resFrom,
        resTo,
        loading
    } = params;
    const loadMessages = () => {
        setParams({ ...params, currentPage: currentPage + 1 });
        fetch(`/chat/byId/${userId}/${currentPage + 1}`, {
            headers: {
                'auth-token': localStorage['token']
            }
        }).then(e => e.json()).then(e => console.log(e))
    }
    useEffect(() => {
        Axios.get(`/chat/${userId}`, {
            headers: {
                'auth-token': localStorage['token']
            }
        }).then(e => {
            setUser(e.data);
        })
        loadMessages();
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        Axios.post(`/chat/send/${userId}`, { content: message }, {
            headers: {
                'auth-token': localStorage['token']
            }
        });
        setParams({ ...params, message: '' })
    }
    return <div className="card">
        <div className="card-header">
            <h3 className="card-title">{user.firstName} {user.lastName}</h3>
        </div>
        <div className="card-body">
            <InfiniteScroll
                pageStart={1} loadMore={loadMessages}
                useWindow={false} hasMore={pageCount > currentPage}
                initialLoad={false} id="scroll"
            >
                {messages.map(e => <Message key={e._id} info={e} />)}
            </InfiniteScroll>
        </div>
        <div className="card-footer">
            <form action="" noValidate onSubmit={sendMessage}>
                <div className="form-group row">
                    <div className="col-11">
                        <input type="text" value={message} onChange={handleMessage}
                            className="form-control" />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary">Send</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}
export default Chat;