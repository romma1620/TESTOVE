import React from "react";

const IndexPage = (props) => {
    React.useEffect(() => {
        const  token = localStorage.getItem('Chat_Token')
        if (token){
            props.history.push('/login');
        } else {
            props.history.push('/dashboard')
        }
    }, [])
    return <div>
    </div>

};

export default IndexPage;
