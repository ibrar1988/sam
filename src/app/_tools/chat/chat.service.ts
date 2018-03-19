import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = '35.190.168.61:5000';
  private socket;
  
  sendMessage(message){
    this.socket.emit('msg', message);
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('msg', (data) => {
        observer.next(data);
        console.log(data);
      });
      return () => {
        this.socket.disconnect();
      };  
    })
    return observable;
  }  
}