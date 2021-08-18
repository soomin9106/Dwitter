import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClient from './network/http';
import Socket from './network/socket';
import TokenStorage from './db/token';
import socket, { io } from 'socket.io-client';


const baseURL = "http://localhost:8080";
const tokenStorage=new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const socketClient = new Socket(baseURL,()=>tokenStorage.getToken());
const httpClient = new HttpClient(baseURL,authErrorEventBus);
const authService = new AuthService(httpClient,tokenStorage);
const tweetService = new TweetService(httpClient,tokenStorage,socketClient);

const socketIO = socket(baseURL);
socketIO.on('connect_error',(error) => {
  console.log('socket error!');
});
socketIO.on('dwitter',(message) => {
  console.log(message);
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
