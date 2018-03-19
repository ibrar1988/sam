import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0001 } from 'core/interfaces/Portfolio/AboutMe/IC0001';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-ic0001',
  templateUrl: './ic0001.component.html',
  styleUrls: ['./ic0001.component.css']
})
export class IC0001Component implements OnInit, OnChanges, OnDestroy {
  completed: boolean;
  closeResult: string;
  public value = false;
  public onText = 'Public';
  public offText = 'Private';
  public onColor = 'yellow';
  public offColor = 'yellow';
  public size = 'normal';
  public disabled = false;

  switch: boolean;

  onFlagChange(event) {
    if (!this.value) {
    }
  }
    show_alert= false;
    showspin:boolean=true;
    title_modal_1 = '';
    container_tooltip = "Show others what an amazing person you are! Record and upload a video to YouTube in which you present yourself. Talk about your passions, what is important for you, what makes you special, etc. Be creative to stand out from the crowd. Keep it short though. Most people will watch not more than 60 sec. of your video. Use the space on the right to write about what is important for you but you can't include in the video.";
    youtube_tooltip= "Add the link of your story video stored on YouTube."
    newItem: IC0001;
    TYPES: any = TYPES;
    errorMessage: string;
    container_name= "My Story";
    container_id = '6bbd9684-8ad7-436d-ae2e-262b019b1804';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update ' + this.container_name;
    @Input() container: IC0001;
    @Output() EventOutput: EventEmitter<IC0001> = new EventEmitter<IC0001>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;

    constructor(private modalService: NgbModal,private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService) { }

    ngOnInit() {
      this.newItem = new IC0001();
      this.newItem.url = '';
      this.getContainer();
    }
    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
      $("#portfolio-ms-video-modal,#portfolio-sop-modal,#portfolio-my-story-modal-md,#portfolio-cross-cultural-modal-sm").remove();
    }

    updateContainer() {
      var reg = /"/g;
      this.completed = true;
      this.container.completed = this.completed;
      this.container.type = 'Video';
      let json = JSON.stringify(this.container);//.replace(reg, '\\\\\\\"');
      console.log(json);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0001';
      putRequest.completed = this.completed;
      putRequest.json = json;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          console.log(response);
          this.standardResponse = response;

          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name , 'Updated');
          } else {
            this._notification.error('Error',this.errorUpdate);
            this.getContainer();
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error',this.errorUpdate);
          console.log(this.errorMessage);
        });
      // this.EventOutput.emit(this.container);
    }

    getContainer() {
      //this.container = CONTAINER;
      this._service.getPortfolioContainer(this.container_id)
        .subscribe(response => {
          this.apiResponse = response;

          if (this.apiResponse.response.code === 'AM0000') {
            //this._notification.success('Container Updated', 'Container Updated');
            if (this.apiResponse.container) {
              try {
                this.showspin=false;
                this.container = JSON.parse(this.apiResponse.container.json);
                this.newItem.title = this.container.title;
                this.newItem.description = this.container.description;
                this.newItem.url = this.container.url;
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            this._notification.error('Error', this.errorGet);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error', this.errorGet);
          console.log(this.errorMessage);
        });
      // // this.EventOutput.emit(this.container);
    }

    addVideo() {
      if (this.newItemIsValid()) {
        this.newItem.title = this.container.title;
        this.newItem.description = this.container.description;
        this.container.url = this.newItem.url;
        this.updateContainer();
        this.newItem = new IC0001();
        if(this.container){
          this.newItem.title = this.container.title;
          this.newItem.description = this.container.description;
          this.newItem.url = this.container.url;
        };
      }
    }
    addDescription() {
      if (this.newItemIsValid()) {
        this.newItem.url = this.container.url;
        this.container = this.newItem;
        this.updateContainer();
        this.newItem = new IC0001();
        if(this.container){
          this.newItem.title = this.container.title;
          this.newItem.description = this.container.description;
          this.newItem.url = this.container.url;
        };
      }
    }

    newItemIsValid(): boolean{
      return true;
    }
    updateItem(){
      this.newItem.title = this.container.title;
      this.newItem.description = this.container.description;
      this.newItem.url = this.container.url;
    }

    youtubeEmbedUrl(url: string): string{
      var video_id = url.split('v=')[1];
      if(video_id == null){
        video_id = 'EFAZzIIyRmI'; //myKlovr Video
      }
      var ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      return 'https://www.youtube.com/embed/' + video_id;
    }
  }
  const CONTAINER: IC0001 = {
    completed: true,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sem ac turpis tincidunt vestibulum. Ut gravida accumsan viverra. Suspendisse a libero quis dui sollicitudin bibendum eu nec sem. Quisque ullamcorper quam nec malesuada convallis. Suspendisse potenti. In sodales libero et pellentesque imperdiet. ',
    title: 'My Motivation',
    type: 'video',
    url: 'https://www.youtube.com/embed/EFAZzIIyRmI'
  };
  const TYPES: any = [
    {name: 'Video'},
    {name: 'Image'},
    {name: 'Text'}
  ]
