import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from 'app/_tools/chat/chat.component';
import { ChatService } from 'core/services/chat.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
// import { DropzoneComponent } from 'app/_tools/upload/dropzone.component';
const config: SocketIoConfig = { url: '35.190.168.61:5000', options: {} };


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SocketIoModule.forRoot(config),
        BrowserAnimationsModule,
        SimpleNotificationsModule
    ],
    declarations: [DatepickerComponent,ChatComponent],
    exports: [
        CommonModule,
        DatepickerComponent,
        ChatComponent

    ], providers: [ChatService]
})
export class ToolsModule { }