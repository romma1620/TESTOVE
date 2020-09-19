import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import IndexPage from "./Pages/IndexPage";
import ChatroomPage from "./Pages/ChatRoomPage";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token =  localStorage.getItem('Chat_Token')
    if (token && !socket){
      const newSocket = io('http://localhost:1616', {
        query: {
          token: localStorage.getItem('Chat_Token')
        }
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket disconnected');
      });

      newSocket.on('connect', () => {
        makeToast('success', 'Socket connected')
      });

      setSocket(newSocket);
    }
  }

  React.useEffect(() => {
    setupSocket();
  }, [])

  return <BrowserRouter>
    <Switch>
      <Route path='/' component={IndexPage} exact/>
      <Route
          path='/login'
          render={() => <LoginPage setupSocket={setupSocket} /> }
          exact
      />
      <Route path='/register' component={RegisterPage} exact/>
      <Route
          path='/dashboard'
          render={() => <DashboardPage socket={socket}/>}
          exact/>
      <Route
          path='/chatroom/:id'
          render={() => <ChatroomPage socket={socket}/>}
          exact/>
    </Switch>
  </BrowserRouter>
}

export default App;
