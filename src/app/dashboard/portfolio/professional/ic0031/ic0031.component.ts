import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IC0031 } from 'core/interfaces/Portfolio/Professional/IC0031';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ic0031',
  templateUrl: './ic0031.component.html',
  styleUrls: ['./ic0031.component.css']
})
export class IC0031Component implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  public value = false;
  container_tooltip = "Tell us what your career interests are today so that we can better assist you in selecting colleges and preparing your applications. You can always change your professional preferences in your profile.";
  container_name= "Career Interests";

  errorMessage: string;
  container_id = 'd40ad17c-635d-4bb6-83a6-106269644091';
  @Input() container: IC0031;
  @Output() EventOutput: EventEmitter<IC0031> = new EventEmitter<IC0031>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  professionImageDefault:string;
  url_image: string;
  profession: string;
  speciality: string;
  show_alert: boolean;
  index: number;
  is_completed: boolean;
  header: any;
  private uploadUrl;

  file: File;
  http: any;
  cropperSettings: CropperSettings;

  data: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService,
    private modalService: NgbModal, private _http: HttpClient) { 
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
    this.getContainer();
    this.header = [{ header: 'Authorization', value: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken }];
    this.uploadUrl = environment.apiUrlPrefix + 'storage/upload/v2/PROFESSIONAL';
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
    this.is_completed = true;
    var reg = /"/g;
    let json = JSON.stringify(this.container);
    console.log(json);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0031';
    putRequest.json = json;
    putRequest.completed = this.is_completed;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name + ' Updated', '');
        } else {
          this._notification.error('Error Updating '+ this.container_name + ' Container', 'Container not updated');
          this.getContainer();
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error Updating Container', this.errorMessage);
      });
  }
  assign() {
    //this.valuetest = this.container.comment.length;
  }
  
  getContainer() {
    this.professionImageDefault = "assets/images/home/icons6c.png";
    this._service.getPortfolioContainer(this.container_id)
      .subscribe(response => {
        this.apiResponse = response;

        if (this.apiResponse.response.code === 'AM0000') {
          if (this.apiResponse.container) {
            try {
              this.container = <IC0031>JSON.parse(this.apiResponse.container.json);
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          this._notification.error('Error Getting Container', 'Container not updated');
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error login', this.errorMessage);
      });
  }

  saveProfession(content):boolean{
    this.show_alert = false;

    if(this.url_image == "" || this.url_image == undefined){
      this.url_image = this.professionImageDefault;
    }

    if(this.profession == "" || this.profession == undefined){
      this.errorMessage = "Field Profession required!";
      this.show_alert = true;
      return false;
    }

    // if(this.speciality == "" || this.speciality == undefined){
    //   this.errorMessage = "Field Speciality required!";
    //   this.show_alert = true;
    //   return false;
    // }

    if(!this.show_alert){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.career_interests[this.index].url_image = this.url_image;
        this.container.career_interests[this.index].title = this.profession;
        this.container.career_interests[this.index].speciality = this.speciality;
      }else{
        this.container.career_interests.push({
          url_image: this.url_image, 
          title:this.profession,
          speciality:this.speciality 
        });
      }

      this.updateContainer();

      //Se limpian las variables una vez ingresado el objeto
      this.clearInputs();
      return true;
    }
  }

  removeItem(position):void{
    var element = document.getElementById("c-tag-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.career_interests.splice(position, 1);
      this.updateContainer();
    }, 600);
  }

  clearInputs(): void{
    this.url_image = "";
    this.profession = "";
    this.speciality = "";
  }

  open(isnew, position,content) {
    this.show_alert = false;
    this.clearInputs();

    if(isnew){
      this.title_modal = "Add New Profession";
      this.index = -1;
    }else{
      this.title_modal = "Update Profession";
      this.index = position;
    }

    if(position >= 0){
      let carrer = this.container.career_interests[position];
      this.url_image = carrer.url_image;
      this.profession = carrer.title;
      this.speciality = carrer.speciality;
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

  onUploadFinished(event):void{
    let result = JSON.parse(event.serverResponse._body);
    if(result.response.code == "AM0000"){
      this.url_image = result.storage_url;
    }
  }

  onRemoved(event) {
    let result = JSON.parse(event.serverResponse._body);
    if(result.response.code == "AM0000"){
      this.url_image = this.professionImageDefault;
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
          this.url_image = data.storage_url;
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
