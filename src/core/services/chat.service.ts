import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ChatService {
    url: 'http://35.190.168.61:5000';

    constructor(private socket: Socket, private _notification: NotificationsService) { }

    ms : string;

    getMessage() {
        return this.socket
            .fromEvent<any>('msg')
            .map(data => {
                alert(data);
                this.ms = data.msg;
                console.log(this.ms);
                this._notification.info('New Message', this.ms);

            });
    }

    getMessages() {
        let observable = new Observable(observer => {
          this.socket.on('msg', (data) => {
            observer.next(data);    
            console.log(data);
            this._notification.info('New Message', data);
          });
          return () => {
            this.socket.disconnect();
          };  
        })     
        return observable;
      }  

    sendMessage(msg: string) {
        alert(msg);
        this.socket
            .emit("msg", msg);

    }
}
