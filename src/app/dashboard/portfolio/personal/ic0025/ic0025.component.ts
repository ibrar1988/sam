import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0025, ExtracurricularsEntity } from 'core/interfaces/Portfolio/Personal/IC0025';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { environment } from 'environments/environment';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-ic0025',
  templateUrl: './ic0025.component.html',
  styleUrls: ['./ic0025.component.css']
})
export class IC0025Component implements OnInit, OnChanges, OnDestroy, AfterViewInit  {
  title_modal:string;
  index:number;
  closeResult: string;
  public value = false;
  completed: boolean;
    newItem: ExtracurricularsEntity;
    errorMessage: string;
    show_alert= false;
    container_name= "Extracurriculars";
    container_id = '6c386a69-9921-49e3-ab62-2e57b494ddbc';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update' + this.container_name;
    container_tooltip = "Tell us in which extracurricular activities you participated, for how long, and what roles you held. College admissions officers are interested in your non-academic activities as they can tell them a lot about who you are.";
    @Input() container: IC0025;
    @Output() EventOutput: EventEmitter<IC0025> = new EventEmitter<IC0025>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;
    max_date: Date;
    from_date: Date;
    to_date: Date;
    header: any;
    private uploadUrl;
    extracurricular_image_default: string;

    file: File;
    http: any;
    cropperSettings: CropperSettings;
  
    data: any;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(private modalService: NgbModal,private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService, private _http: HttpClient) { 
      //Cropper Settings
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.cropperSettings.fileType = 'image/jpeg';
      this.cropperSettings.width = 100;
      this.cropperSettings.height = 100;
      this.cropperSettings.croppedWidth =150;
      this.cropperSettings.croppedHeight = 150;
      this.cropperSettings.canvasWidth = 220;
      this.cropperSettings.canvasHeight = 220;

      this.data = {};
    }

    ngOnInit() {
      this.newItem = new ExtracurricularsEntity();
      this.getContainer();
      this.extracurricular_image_default = "assets/images/home/icons6c.png";
      this.header = [{ header: 'Authorization', value: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken }];
      this.uploadUrl = environment.apiUrlPrefix + 'storage/upload/v2/PERSONAL';
      //this.updateContainer();
    }
    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
    }

    @ViewChild('input-file') el: ElementRef;
    @ViewChild('input-file-trigger') button: ElementRef;
    @ViewChild('file-return') the_return: ElementRef;
  
    ngAfterViewInit(): void {
      document.querySelector("html").classList.add('js');
    }

    updateContainer() {
      this.completed = false;
      this.container.completed = this.completed;
      var reg = /"/g;
      let json = JSON.stringify(this.container);//.replace(reg, '\\\\\\\"');
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.completed = this.completed;
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0025';
      putRequest.json = json;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          this.standardResponse = response;

          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name , 'Updated');
          } else {
            this._notification.error('Error' , this.errorUpdate);
            this.getContainer();
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error' , this.errorUpdate);
          console.log(this.errorMessage);
          this.getContainer();
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
                this.container = JSON.parse(this.apiResponse.container.json);
                this.max_date = this.DateFormat(new Date());
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            this._notification.error('Error' , this.errorGet);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error' , this.errorGet);
          console.log(this.errorMessage);
        });
      // // this.EventOutput.emit(this.container);
    }
    removeItem(index: number) {
      document.getElementById('extracurricular' + index).classList.add('removed-item');
      setTimeout(() => {
        this.container.extracurriculars.splice( index, 1);
        this.updateContainer();
      }, 600);
    }
    saveNewExtracurricular():boolean {
      if (this.newExtracurricularIsValid()) {
        if(this.index<0){
          this.container.extracurriculars.push(this.newItem);
        }
        else{
          this.container.extracurriculars[this.index]= this.newItem;
        }

        this.updateContainer();
        this.newItem = new ExtracurricularsEntity();
        return true;
      }
      return false;
    }
    newExtracurricularIsValid(): boolean {
      if (this.newItem.title === '' || this.newItem.title === undefined) {
        this.errorMessage = 'Field Title is Required';
        this.show_alert = true;
        return false;
        }
      if(this.newItem.award === '' || this.newItem.award === undefined){
        this.errorMessage = 'Field Award is Required';
        this.show_alert = true;
        return false;
      }
        
      if(this.from_date === null || this.from_date === undefined){
        this.errorMessage = 'Field From is Required';
        this.show_alert = true;
        return false;
      }
      else{
        this.newItem.from_date = this.formatDate(this.from_date);
      }

      if(this.newItem.in_progress){
        this.newItem.to_date = this.to_date = null;
      }
      else
      {
        if(this.to_date === null || this.to_date === undefined){
          this.errorMessage = 'Field To is Required';
          this.show_alert = true;
          return false;
        }
        else{
          this.newItem.to_date = this.formatDate(this.to_date);

          if(new Date(this.newItem.from_date) > new Date(this.newItem.to_date)){
            this.errorMessage = "From Date can't be greater than To Date";
            this.show_alert = true;
            return false;
          }
        }
      }

      if(this.newItem.description === '' || this.newItem.description === undefined){
        this.errorMessage = 'Field Description is Required';
        this.show_alert = true;
        return false;
      }
      this.errorMessage = '';
      this.show_alert = false;
      return true;
    }
    open(isnew, position,content){
      this.show_alert = false;  
      if(isnew){
        this.title_modal = "Add";
        this.index = -1;
        this.newItem = new ExtracurricularsEntity();
        this.newItem.from_date = this.from_date = null;
        this.newItem.to_date = this.to_date = null;
      }
      else
      {
        this.title_modal = "Edit";
        this.index = position;
      }
  
      if(position >= 0){
        let item = this.container.extracurriculars[position];
        this.newItem = item;
        this.from_date = new Date(item.from_date);
        this.to_date = item.to_date == null ? null : new Date(item.to_date);
      }
      
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    DateFormat(date): Date {
      return new Date(date);
    }
  
    DateFormatToString(date, in_progress): string {
      let new_format: string;
      if(date == "" || date == null){
        if(!(Boolean)(in_progress))
          new_format = "MM/DD/YYYY";
        else
          new_format = "Present";
      }
      else{
        let new_date = new Date(date);
        new_format = (new_date.getMonth()+1) + "/" + (new_date.getDate()) + "/" + new_date.getFullYear();
      }
      return new_format;
    }

    onUploadFinished(event):void{
      let result = JSON.parse(event.serverResponse._body);
      if(result.response.code == "AM0000"){
        this.newItem.url_image = result.storage_url;
      }
    }

    formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [month, day, year].join('/');
    }
  
    onRemoved(event) {
      let result = JSON.parse(event.serverResponse._body);
      if(result.response.code == "AM0000"){
        this.newItem.url_image = "assets/images/home/icons6c.png";
      }
    }

    //Cropper
    fileChangeListener($event, cropperComp: ImageCropperComponent) {
      this.cropper = cropperComp;
      var image: any = new Image();
      this.file = $event.target.files[0];
      var myReader: FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
      };

      myReader.readAsDataURL(this.file);
    }

    fileChange() {
      let formData: FormData = new FormData();
      formData.append('image', this.data.image);
      let headers = new HttpHeaders();

      const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
      const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

      this._http.post(`${this.uploadUrl}`, formData, options).map(res => res)
        .catch(error => Observable.throw(error))
        .subscribe(
        data => {
          if(data.storage_url == undefined){
            this._notification.error("Error", "");
          }
          else{
            this.newItem.url_image = data.storage_url;
            this.clearImage();
          }
        },
        error => console.log(error)
        )
    }

    clearImage() {
      this.file = null;
      //this.data = null;
    }
  }
  const CONTAINERSTRING: string = "{\"extracurriculars\":[{\"url_image\":\"\",\"title\":\"Arts\",\"award\":\"First Place\",\"from_date\":\"Oct 27th, 2016\",\"to_date\":\"Oct 27th, 2017\",\"description\":\"It was a hard competition!\"}]}";
  const CONTAINER: IC0025 = {
    completed: true,
    extracurriculars: [
      { url_image: "assets/images/home/icons6c.png", title: "Arts", award: "First Place", from_date: "Oct 27th, 2016", to_date: "Oct 27th, 2017", description: "It was a hard competition!", in_progress: false, leadership: false }//,
      // { url_image: 'http://localhost:4200/assets/images/home/icons7c.png', title: 'Music', award: 'Second Place', from_date: 'Oct 27th, 2016', to_date:  'Oct 27th, 2017', description: 'We did our best perform.'},
      // { url_image: 'http://localhost:4200/assets/images/home/icons7c.png', title: 'Spanish', award: 'Gold Medal', from_date: 'Oct 27th, 2016', to_date:  'Oct 27th, 2017', description: 'It was a wonderful experience!'}
     ]
  };
