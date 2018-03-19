import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0029, AchievementsAwardsEntity } from 'core/interfaces/Portfolio/Personal/IC0029';
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
  selector: 'app-ic0029',
  templateUrl: './ic0029.component.html',
  styleUrls: ['./ic0029.component.css']
})
export class IC0029Component implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  title_modal:string;
  index:number;
  closeResult: string;
  show_alert= false;
  public value = false;
  completed: boolean;
    newItem: AchievementsAwardsEntity;
    errorMessage: string;
    container_name= "Achievements & Awards";
    container_id = 'ca808208-a27e-44ab-b225-1b38dfe594d0';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update' + this.container_name;
    container_tooltip = "Honors given in recognition of outstanding non-academic achievement and as a means to further encourage personal growth.";
    @Input() container: IC0029;
    @Output() EventOutput: EventEmitter<IC0029> = new EventEmitter<IC0029>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;
    max_date: Date;
    date: Date;
    header: any;
    private uploadUrl;
    awards_image_default: string;

    file: File;
    http: any;
    cropperSettings: CropperSettings;
  
    data: any;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(private modalService: NgbModal, private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService, private _http: HttpClient) {
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
      this.newItem = new AchievementsAwardsEntity();
      this.getContainer();
      this.awards_image_default = "assets/images/home/icons8c.png";
      this.header = [{ header: 'Authorization', value: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken }];
      this.uploadUrl = environment.apiUrlPrefix + 'storage/upload/v2/PERSONAL';
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
      this.completed = true;
      this.container.completed = this.completed;
      let json = JSON.stringify(this.container);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0029';
      putRequest.json = json;
      putRequest.completed = this.completed;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          console.log(response);
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
    }
    removeItem(index: number) {
      document.getElementById('achievements-' + index).classList.add('removed-item');
      setTimeout(() => {
        this.container.achievements_awards.splice( index, 1);
        console.log(this.container);
        this.updateContainer();
      }, 600);
    }
    addItem(): boolean {
      if (this.newItemIsValid()) {
        if(this.index<0){
          this.container.achievements_awards.push(this.newItem);
        }
        else{
          this.container.achievements_awards[this.index]= this.newItem;
        }
        this.updateContainer();
        this.newItem = new AchievementsAwardsEntity();
        return true;
      }
      return false;
    }
    newItemIsValid(): boolean{
      
      if (this.newItem.category === '' || this.newItem.category === undefined) {
        this.errorMessage = 'Field Category Name is Required';
        this.show_alert = true;
        return false;
        }
      if(this.date == null || this.date === undefined){
        this.errorMessage = 'Field Date is Required';
        this.show_alert = true;
        return false;
      }
      else{
        this.newItem.date = this.date.toDateString();
      }

      if(this.newItem.description === '' || this.newItem.description === undefined){
        this.errorMessage = 'Field Description is Required';
        this.show_alert = true;
        return false;
      }
      // if(this.newItem.reference === '' || this.newItem.reference === undefined){
      //   this.errorMessage = 'Field Reference is Required';
      //   this.show_alert = true;
      //   return false;
      // }
      this.errorMessage = '';
      this.show_alert = false;
    return true;
    }
    open(isnew, position,content){
      this.show_alert = false;  
      if(isnew){
        this.title_modal = "Add";
        this.index = -1;
        this.newItem = new AchievementsAwardsEntity();
        this.date = null;
      }else{
        this.title_modal = "Edit";
        this.index = position;
      }
  
      if(position >= 0){
        let item = this.container.achievements_awards[position];
        this.newItem = item;
        this.date = new Date(item.date);
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
  
    DateFormatToString(date): string {
      let new_format: string;
      if(date == ""){
        new_format = "MM/DD/YYYY";
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
  
    onRemoved(event) {
      let result = JSON.parse(event.serverResponse._body);
      if(result.response.code == "AM0000"){
        this.newItem.url_image = "assets/images/home/icons8c.png";
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
  const CONTAINER: IC0029 = {
    completed: true,
    achievements_awards: [
      { url_image: "assets/images/home/icons8c.png", category: "First Place", date: 'Aug 7th', description: 'It was a hard competition!', reference: ''}//,
     ]
  };
