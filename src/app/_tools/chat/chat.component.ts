import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ChatService } from './chat.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {


  }
  messages = [];
  connection;
  message = {};
  text = '';
  time = '';
  user = '';
  url_image = '';
  constructor(private chatService: ChatService, private _notificationsService: NotificationsService) { }

  sendMessage() {
    let image = JSON.parse(localStorage.getItem('currentUser')).url_image;

    if (this.text != '') {
      if (image == '' && typeof (image) !== "undefined" && image !== null) {
        image = 'assets/images/home/icons6c.png';
      } else {
        image = JSON.parse(localStorage.getItem('currentUser')).url_image;
      }



      this.time = new Date().toLocaleTimeString();
      this.user = JSON.parse(localStorage.getItem('currentUser')).first_name;
      this.message = { user_id: JSON.parse(localStorage.getItem('currentUser')).user_id, user: this.user, text: this.text, photo: image, time: this.time };
      console.log(this.message);
      this.chatService.sendMessage(this.message);
      this.message = {};
      this.text = '';
      this.url_image = '';
    }
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log('Msg  : ' + JSON.stringify(message));

      if (JSON.parse(localStorage.getItem('currentUser')).user_id == message['user_id']) {
        message['user'] = 'Me';
      } else {

      }




      this.messages.push(message);
      this._notificationsService.info(message['user'] + ' sends you', message['text']);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
