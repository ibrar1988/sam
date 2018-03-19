import { Component, AfterViewInit, Input, Output, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { AboutService } from 'core/services/About/aboutUs.service';
import { About } from 'core/interfaces/About/IAbout';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { NotificationsService } from 'angular2-notifications';

@Component({
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements AfterViewInit, OnInit {
    errorMessage: any;
    Response: IStandardResponse;
    title: string;
    public loading = true;
    lat: number = 40.762524;
    lng: number = -73.977767;
    first_name: string = "";
    last_name: string = "";
    select_option: string = "";
    email: string = "";
    message: string = "";

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    constructor(iconRegistry: MdIconRegistry, private aboutService: AboutService, private _notification: NotificationsService) {
        this.loading = true;
        this.title = 'About Us';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    sendContactInformation(): void {
        let message = new About();
        message.first_name = this.first_name;
        message.last_name = this.last_name;
        message.email = this.email;
        message.category = this.select_option;
        message.message = this.message;

        this.aboutService.sendAboutMessage(message)
            .subscribe(response => {
                this.Response = response;
                if (this.Response) {
                    if (this.Response.code === 'AM0000') {

                        this.first_name = '';
                        this.last_name = '';
                        this.select_option = '';
                        this.email = '';
                        this.message = '';
                        this._notification.success('Success', 'Email sended');

                    } else {

                        this._notification.error('Error getting goals', this.Response.message);
                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                this._notification.error('Error getting goals', this.errorMessage);
            });

        }
}
