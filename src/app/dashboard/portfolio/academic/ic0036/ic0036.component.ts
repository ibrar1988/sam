import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0036 } from 'core/interfaces/Portfolio/Academic/IC0036';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ic0036',
  templateUrl: './ic0036.component.html',
  styleUrls: ['./ic0036.component.css']
})
export class IC0036Component implements OnInit, OnChanges, OnDestroy {
  public value = false;
  container_tooltip = "Standardized test scores are very important for college admissions because they are an established measure of a student's college readiness. Tell us what tests you took and what your scores were so that we can provide you with better guidance.";
  container_name= "Standardized Test Scores";

  errorMessage: string;
  container_id = '8eb84ec9-8a21-475e-9b62-ae44744fd8b5';
  @Input() container: IC0036;
  @Output() EventOutput: EventEmitter<IC0036> = new EventEmitter<IC0036>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  have_container: boolean;
  closeResult: string;
  title_modal: string;
  show_alert: boolean;
  tests: Test[];
  is_completed: boolean;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService,private modalService: NgbModal) { 
  }

  ngOnInit() {
    this.tests = new Array(0);
    this.tests.push({ container_code: "IC0009", description: "PSAT 8/9", visible: false});
    this.tests.push({ container_code: "IC0010", description: "PSAT 10", visible: false});
    this.tests.push({ container_code: "IC0011", description: "PSAT/NMSQT", visible: false});
    this.tests.push({ container_code: "IC0012", description: "SAT", visible: false});
    this.tests.push({ container_code: "IC0013", description: "SAT II", visible: false});
    this.tests.push({ container_code: "IC0014", description: "Pre-ACT", visible: false});
    this.tests.push({ container_code: "IC0015", description: "ACT", visible: false});

    this.getContainer();
  }
  ngOnChanges() { //On @Input property changes
  }
  ngOnDestroy() {
  }

  updateContainer() {
    this.is_completed = true;
    var reg = /"/g;
    let json = JSON.stringify(this.container);
    console.log(json);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0036';
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
    this._service.getPortfolioContainer(this.container_id)
      .subscribe(response => {
        this.apiResponse = response;

        if (this.apiResponse.response.code === 'AM0000') {
          if (this.apiResponse.container) {
            try {
              this.container = <IC0036>JSON.parse(this.apiResponse.container.json);

              for (let test_container of this.container.tests_container) {
                if(test_container.visible){
                  this.have_container = true;
                  this.tests.find(t => t.container_code === test_container.container_code).visible = true;
                }
              }
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

  saveTestContainer(content):boolean{
    //Se vacia el listado de test
    this.container.tests_container = new Array(0);

    //Se recorre el listado de test para ingresarlo al container
    let count_visible = 0;
    for(let test of this.tests){
      if(test.visible)
        count_visible += 1;

      this.container.tests_container.push({ 
        container_id: "", 
        container_code: test.container_code,
        visible: test.visible
      });
    }

    if(count_visible > 0)
      this.have_container = true;
    else
      this.have_container = false;

    //Se actualiza el contenedor
    this.updateContainer();
    return true;
  }

  open(isnew,content) {
    this.show_alert = false;

    if(isnew)
      this.title_modal = "Add Test";
    else
      this.title_modal = "Which Tests Have You Taken?";

    console.log(this.tests);

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
}

export class Test {
  container_code: string;
  description: string; 
  visible: boolean;
}