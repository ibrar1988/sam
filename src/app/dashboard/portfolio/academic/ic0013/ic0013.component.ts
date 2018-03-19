import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0013 } from 'core/interfaces/Portfolio/Academic/IC0013';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0013',
  templateUrl: './ic0013.component.html',
  styleUrls: ['./ic0013.component.css']
})
export class IC0013Component implements OnInit, OnChanges, OnDestroy {

  errorMessage: string;
  container_id = 'cd01da8a-6745-45af-bd16-4f8351ab3276';
  container_name = 'SAT II';
  errorGet = 'Cannot Get ' + this.container_name;
  errorUpdate = 'Cannot Update ' + this.container_name;
  @Input() container: IC0013;
  @Output() EventOutput: EventEmitter<IC0013> = new EventEmitter<IC0013>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  show_alert: boolean;
  index: number;
  is_completed: boolean;

  //Variables de entidad
  math_level_1: string;
  math_level_2: string;
  ecological_biology: string;
  molecular_biology: string;
  chemistry: string;
  physics: string;
  english: string;
  us_history: string;
  world_history: string;
  spanish: string;
  spanish_listening: string;
  french: string;
  french_listening: string;
  chinese_listening: string;
  italian: string;
  german: string;
  german_listening: string;
  modern_hebrew: string;
  latin: string;
  japanese_listening: string;
  koren_listening: string;

  show_mathematics: boolean;
  show_science: boolean;
  show_english: boolean;
  show_history: boolean;
  show_languages: boolean;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService, 
    private modalService: NgbModal) { 
  }

  ngOnInit() {
    this.getContainer();
  }
  ngOnChanges() { //On @Input property changes
  }
  ngOnDestroy() {
  }

  updateContainer() {
    this.is_completed = true;
    var reg = /"/g;

    this.verifyContentContainer();
    let json = JSON.stringify(this.container);
    console.log(json);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0013';
    putRequest.json = json;
    putRequest.completed = this.is_completed;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name, 'Updated');
        } else {
          this._notification.error('Error', this.errorUpdate);
        }
      },
      error => {
        this.errorMessage = <any>error;
        console.log(this.errorMessage);
        this._notification.error('Error', this.errorUpdate);
      });
  }
  assign() {
    //this.valuetest = this.container.comment.length;
  }
  
  getContainer() {
    this._service.getPortfolioContainer(this.container_id)
      .subscribe(response => {
        this.apiResponse = response;

        if (this.apiResponse.response.code === 'AM0000') {
          if (this.apiResponse.container) {
            try {
              this.container = <IC0013>JSON.parse(this.apiResponse.container.json);
              this.verifyContentContainer();
              
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
        console.log(this.errorMessage);
        this._notification.error('Error', this.errorGet);
      });
  }

  verifyContentContainer(){
    //reinicio de variables
    this.show_mathematics = true;
    this.show_science = true;
    this.show_english = true;
    this.show_history = true;
    this.show_languages = true;
    
    for(let sat of this.container.sat_ii){
      //Mathematics
      if(sat.math_level_1 != "" || sat.math_level_2 != ""){
        this.show_mathematics = false;
      }

      //Science
      if(sat.ecological_biology != undefined || sat.molecular_biology != undefined || sat.chemistry != "" || sat.physics != ""){
        this.show_science = false;
      }

      //English
      if(sat.english != ""){
        this.show_english = false;
      }

      //History
      if(sat.us_history != "" || sat.world_history != ""){
        this.show_history = false;
      }

      //Language
      if(sat.spanish != "" || sat.spanish_listening != "" || sat.french != "" || sat.french_listening != "" || 
         sat.italian != "" || sat.german != "" || sat.german_listening != "" || sat.modern_hebrew != "" ||
         sat.latin != "" || sat.japanese_listening != "" || sat.koren_listening != ""){
          this.show_languages = false;
      }
    }
  }

  open(isnew, position, content) {
    this.show_alert = false;
    this.clearInputs();

    if(isnew){
        this.title_modal = "Add New SAT II";
        this.index = -1;
    }else{
    this.title_modal = "Update SAT II";
    this.index = position;
    }

    if(position >= 0){
        let sat_ii = this.container.sat_ii[position];
        this.math_level_1 = sat_ii.math_level_1;
        this.math_level_2 = sat_ii.math_level_2;
        this.ecological_biology = sat_ii.ecological_biology;
        this.molecular_biology = sat_ii.molecular_biology;
        this.chemistry = sat_ii.chemistry;
        this.physics = sat_ii.physics;
        this.english = sat_ii.english;
        this.us_history = sat_ii.us_history;
        this.world_history = sat_ii.world_history;
        this.spanish = sat_ii.spanish;
        this.spanish_listening = sat_ii.spanish_listening;
        this.french = sat_ii.french;
        this.french_listening = sat_ii.french_listening;
        this.chinese_listening = sat_ii.chinese_listening;
        this.italian = sat_ii.italian;
        this.german = sat_ii.german;
        this.german_listening = sat_ii.german_listening;
        this.modern_hebrew = sat_ii.modern_hebrew;
        this.latin = sat_ii.latin;
        this.japanese_listening = sat_ii.japanese_listening;
        this.koren_listening = sat_ii.koren_listening;
    }
    
    this.modalService.open(content, { size: 'lg'} ).result.then((result) => {
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

  clearInputs(): void{
    this.math_level_1 = "";
    this.math_level_2 = "";
    this.ecological_biology = "";
    this.molecular_biology = "";
    this.chemistry = "";
    this.physics = "";
    this.english = "";
    this.us_history = "";
    this.world_history = "";
    this.spanish = "";
    this.spanish_listening = "";
    this.french = "";
    this.french_listening = "";
    this.chinese_listening = "";
    this.italian = "";
    this.german = "";
    this.german_listening = "";
    this.modern_hebrew = "";
    this.latin = "";
    this.japanese_listening = "";
    this.koren_listening = "";
  }

  save_sat_ii(content):boolean{
    this.show_alert = false;

    if(this.FieldValidation()){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.sat_ii[this.index].math_level_1 = this.math_level_1;
        this.container.sat_ii[this.index].math_level_2 = this.math_level_2;
        this.container.sat_ii[this.index].ecological_biology = this.ecological_biology;
        this.container.sat_ii[this.index].molecular_biology = this.molecular_biology;
        this.container.sat_ii[this.index].chemistry = this.chemistry;
        this.container.sat_ii[this.index].physics = this.physics;
        this.container.sat_ii[this.index].english = this.english;
        this.container.sat_ii[this.index].us_history = this.us_history;
        this.container.sat_ii[this.index].world_history = this.world_history;
        this.container.sat_ii[this.index].spanish = this.spanish;
        this.container.sat_ii[this.index].spanish_listening = this.spanish_listening;
        this.container.sat_ii[this.index].french = this.french;
        this.container.sat_ii[this.index].french_listening = this.french_listening;
        this.container.sat_ii[this.index].chinese_listening = this.chinese_listening;
        this.container.sat_ii[this.index].italian = this.italian;
        this.container.sat_ii[this.index].german = this.german;
        this.container.sat_ii[this.index].german_listening = this.german_listening;
        this.container.sat_ii[this.index].modern_hebrew = this.modern_hebrew;
        this.container.sat_ii[this.index].latin = this.latin;
        this.container.sat_ii[this.index].japanese_listening = this.japanese_listening;
        this.container.sat_ii[this.index].koren_listening = this.koren_listening;
      }else{
        this.container.sat_ii.push({
          math_level_1: this.math_level_1,
          math_level_2: this.math_level_2,
          ecological_biology: this.ecological_biology,
          molecular_biology: this.molecular_biology,
          chemistry: this.chemistry,
          physics: this.physics,
          english: this.english,
          us_history: this.us_history,
          world_history: this.world_history,
          spanish: this.spanish,
          spanish_listening: this.spanish_listening,
          french: this.french,
          french_listening: this.french_listening,
          chinese_listening: this.chinese_listening,
          italian: this.italian,
          german: this.german,
          german_listening: this.german_listening,
          modern_hebrew: this.modern_hebrew,
          latin: this.latin,
          japanese_listening: this.japanese_listening,
          koren_listening: this.koren_listening
        });
      }

      this.updateContainer();

      //Se limpian las variables una vez ingresado el objeto
      this.clearInputs();
      return true;
    }
    else
      return false;
  }

  FieldValidation():boolean {
    if(this.math_level_1 != "" && this.math_level_1 != null){
      if(+this.math_level_1 < 200 || +this.math_level_1 > 800){
        this.show_alert = true;
        this.errorMessage = "Math Level 1 is out of range";
        return false;
      }
    }else{
      this.math_level_1 = "";
    }

    if(this.math_level_2 != "" && this.math_level_2 != null){
      if(+this.math_level_2 < 200 || +this.math_level_2 > 800){
        this.show_alert = true;
        this.errorMessage = "Math Level 2 is out of range";
        return false;
      }
    }else{
      this.math_level_2 = "";
    }
    
    if(this.ecological_biology != "" && this.ecological_biology != null){
      if(+this.ecological_biology < 200 || +this.ecological_biology > 800){
        this.show_alert = true;
        this.errorMessage = "Ecological Biology is out of range";
        return false;
      }
    }else{
      this.ecological_biology = "";
    }

    if(this.molecular_biology != "" && this.molecular_biology != null){
      if(+this.molecular_biology < 200 || +this.molecular_biology > 800){
        this.show_alert = true;
        this.errorMessage = "Molecular Biology is out of range";
        return false;
      }
    }else{
      this.molecular_biology = "";
    }

    if(this.chemistry != "" && this.chemistry != null){
      if(+this.chemistry < 200 || +this.chemistry > 800){
        this.show_alert = true;
        this.errorMessage = "Chemistry is out of range";
        return false;
      }
    }else{
      this.chemistry = "";
    }

    if(this.physics != "" && this.physics != null){
      if(+this.physics < 200 || +this.physics > 800){
        this.show_alert = true;
        this.errorMessage = "Physics is out of range";
        return false;
      }
    }else{
      this.physics = "";
    }

    if(this.english != "" && this.english != null){
      if(+this.english < 200 || +this.english > 800){
        this.show_alert = true;
        this.errorMessage = "English is out of range";
        return false;
      }
    }else{
      this.english = "";
    }

    if(this.us_history != "" && this.us_history != null){
      if(+this.us_history < 200 || +this.us_history > 800){
        this.show_alert = true;
        this.errorMessage = "U.S. History is out of range";
        return false;
      }
    }else{
      this.us_history = "";
    }

    if(this.world_history != "" && this.world_history != null){
      if(+this.world_history < 200 || +this.world_history > 800){
        this.show_alert = true;
        this.errorMessage = "World History is out of range";
        return false;
      }
    }else{
      this.world_history = "";
    }

    if(this.spanish != "" && this.spanish != null){
      if(+this.spanish < 200 || +this.spanish > 800){
        this.show_alert = true;
        this.errorMessage = "Spanish is out of range";
        return false;
      }
    }else{
      this.spanish = "";
    }

    if(this.spanish_listening != "" && this.spanish_listening != null){
      if(+this.spanish_listening < 200 || +this.spanish_listening > 800){
        this.show_alert = true;
        this.errorMessage = "Spanish & Listening is out of range";
        return false;
      }
    }else{
      this.spanish_listening = "";
    }

    if(this.french != "" && this.french != null){
      if(+this.french < 200 || +this.french > 800){
        this.show_alert = true;
        this.errorMessage = "French is out of range";
        return false;
      }
    }else{
      this.french = "";
    }

    if(this.french_listening != "" && this.french_listening != null){
      if(+this.french_listening < 200 || +this.french_listening > 800){
        this.show_alert = true;
        this.errorMessage = "French & Listening is out of range";
        return false;
      }
    }else{
      this.french_listening = "";
    }
    
    if(this.chinese_listening != "" && this.chinese_listening != null){
      if(+this.chinese_listening < 200 || +this.chinese_listening > 800){
        this.show_alert = true;
        this.errorMessage = "Chinese & Listening is out of range";
        return false;
      }
    }else{
      this.chinese_listening = "";
    }

    if(this.italian != "" && this.italian != null){
      if(+this.italian < 200 || +this.italian > 800){
        this.show_alert = true;
        this.errorMessage = "Italian is out of range";
        return false;
      }
    }else{
      this.italian = "";
    }

    if(this.german != "" && this.german != null){
      if(+this.german < 200 || +this.german > 800){
        this.show_alert = true;
        this.errorMessage = "German is out of range";
        return false;
      }
    }else{
      this.german = "";
    }

    if(this.german_listening != "" && this.german_listening != null){
      if(+this.german_listening < 200 || +this.german_listening > 800){
        this.show_alert = true;
        this.errorMessage = "German & Listening is out of range";
        return false;
      }
    }else{
      this.german_listening = "";
    }

    if(this.modern_hebrew != "" && this.modern_hebrew != null){
      if(+this.modern_hebrew < 200 || +this.modern_hebrew > 800){
        this.show_alert = true;
        this.errorMessage = "Modern Hebrew is out of range";
        return false;
      }
    }else{
      this.modern_hebrew = "";
    }

    if(this.latin != "" && this.latin != null){
      if(+this.latin < 200 || +this.latin > 800){
        this.show_alert = true;
        this.errorMessage = "Latin is out of range";
        return false;
      }
    }else{
      this.latin = "";
    }

    if(this.japanese_listening != "" && this.japanese_listening != null){
      if(+this.japanese_listening < 200 || +this.japanese_listening > 800){
        this.show_alert = true;
        this.errorMessage = "Japanese & Listening is out of range";
        return false;
      }
    }else{
      this.japanese_listening = "";
    }

    if(this.koren_listening != "" && this.koren_listening != null){
      if(+this.koren_listening < 200 || +this.koren_listening > 800){
        this.show_alert = true;
        this.errorMessage = "Korean & Listening is out of range";
        return false;
      }
    }else{
      this.koren_listening = "";
    }

    return true;
  }

  removeItem(position):void{
    var element = document.getElementById("sat_ii-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.sat_ii.splice(position, 1);
      this.updateContainer();
    }, 600);
  }
}