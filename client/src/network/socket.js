import socket from 'socket.io-client';

export default class Socket{
    constructor(baseURL,getAccessToken){
        this.io = socket(baseURL, {
            auth : (cb) => cb({token : getAccessToken()}), //using auth field 
        });

        this.io.on('connect_error',(err) => {
            console.log('socket error',err.message);
        });
    }

    //event 와 callback 전달 
    onSync(event,callback){
        if(!this.io.connected){ //연결 되지 않았을 때만 연결
            this.io.connect();
        }

        this.io.on(event,(message) => callback(message)); //콜백 함수 호출
        return () => {this.io.off(event)}; //리턴된 콜백 함수를 가지고 있다가 호출하면 끝나게 됨
    }
}