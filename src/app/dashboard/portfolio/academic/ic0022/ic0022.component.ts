import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IC0022 } from 'core/interfaces/Portfolio/Academic/IC0022';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { environment } from 'environments/environment';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-ic0022',
  templateUrl: './ic0022.component.html',
  styleUrls: ['./ic0022.component.css']
})
export class IC0022Component implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  public value = false;
  container_tooltip = "Honors given in recognition of outstanding academic achievement and as a means to further encourage college scholarship.";
  container_name= "Academic Achievements & Awards";

  errorMessage: string;
  container_id = '78124d27-55ec-4ee7-b869-94ef7b9c38c8';
  @Input() container: IC0022;
  @Output() EventOutput: EventEmitter<IC0022> = new EventEmitter<IC0022>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  awards_image_default: string;
  category: string;
  award_name: string;
  date: Date;
  url_image: string;
  description: string;
  show_alert: boolean;
  index: number;
  is_completed:boolean; 
  max_date: Date;
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
    this.uploadUrl = environment.apiUrlPrefix + 'storage/upload/v2/ACADEMIC';
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
    putRequest.container_code = 'IC0022';
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
    this.awards_image_default = "assets/images/home/achievementsawards.png";
    this._service.getPortfolioContainer(this.container_id)
      .subscribe(response => {
        this.apiResponse = response;

        if (this.apiResponse.response.code === 'AM0000') {
          if (this.apiResponse.container) {
            try {
              this.container = <IC0022>JSON.parse(this.apiResponse.container.json);
              this.max_date = this.DateFormat(new Date());
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

  saveAchievementAward(content):boolean{
    this.show_alert = false;

    if(this.url_image == "" || this.url_image == undefined){
      this.url_image = this.awards_image_default;
    }

    if(this.category == "" || this.category == undefined){
      this.errorMessage = "Field Category required!";
      this.show_alert = true;
      return false;
    }

    if(this.award_name == "" || this.award_name == undefined){
      this.errorMessage = "Field Name required!";
      this.show_alert = true;
      return false;
    }

    if(this.date == null || this.date == undefined){
      this.errorMessage = "Field Date required!";
      this.show_alert = true;
      return false;
    }

    if(!this.show_alert){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.achievements_awards[this.index].url_image = this.url_image;
        this.container.achievements_awards[this.index].category = this.category;
        this.container.achievements_awards[this.index].award_name = this.award_name;

        //Date Format
        /*
        if(this.date != ""){
          let year = this.date['year'];
          let month = this.date['month'];
          let day = this.date['day'];
          this.container.achievements_awards[this.index].date = month + "/" + day + "/" + year;
        }
        */
        this.container.achievements_awards[this.index].date = this.date.toDateString();
        this.container.achievements_awards[this.index].description = this.description;
      }
      else
      {
        /*
        if(this.date != ""){
          let year = this.date['year'];
          let month = this.date['month'];
          let day = this.date['day'];
          this.date = month + "/" + day + "/" + year;
        }
        */

        this.container.achievements_awards.push({
          category: this.category,
          award_name:this.award_name,
          date:this.date.toDateString(),
          url_image: this.url_image,
          description:this.description
        });
      }

      this.updateContainer();

      //Se limpian las variables una vez ingresado el objeto
      this.CleanInputs();
      return true;
    }
  }

  removeItem(position):void{
    var element = document.getElementById("aa-tag-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.achievements_awards.splice(position, 1);
      this.updateContainer();
    }, 600);
  }

  open(isnew, position,content) {
    
    this.show_alert = false;
    this.CleanInputs();

    if(isnew){
      this.title_modal = "Add New Achievement Award";
      this.index = -1;
    }else{
      this.title_modal = "Update Achievement Award";
      this.index = position;
    }

    if(position >= 0){
      let achievement_award = this.container.achievements_awards[position];
      this.url_image = achievement_award.url_image; 
      this.category = achievement_award.category;
      this.award_name = achievement_award.award_name;

      //Date Format
      /*
      this.date = {
        year: Number(this.container.achievements_awards[position].date.split('/')[2]),
        month: Number(this.container.achievements_awards[position].date.split('/')[0]),
        day: Number(this.container.achievements_awards[position].date.split('/')[1])
      };
      */
      this.date = new Date(this.container.achievements_awards[position].date);
      this.description = achievement_award.description;
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

  private CleanInputs(): void{
    this.category = "";
    this.award_name = "";
    this.date = null;
    this.description = "";
    this.url_image = "";
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

  //Upload Photo
  onUploadFinished(event):void{
    let result = JSON.parse(event.serverResponse._body);
    if(result.response.code == "AM0000"){
      this.url_image = result.storage_url;
    }
  }

  onRemoved(event) {
    let result = JSON.parse(event.serverResponse._body);
    if(result.response.code == "AM0000"){
      this.url_image = this.awards_image_default;
    }
  }

  //Cropper
  fileChangeListener0022($event, cropperComp: ImageCropperComponent) {
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

  fileChange0022() {
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
          this.clearImage0022();
        }
      },
      error => console.log(error)
      )
  }

  clearImage0022() {
    this.file = null;
    //this.data = null;
  }
}
