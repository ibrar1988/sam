import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { currentUser } from '../../../app/_mock/global';
import { ILogin } from '../../../core/interfaces/Account/ILogin';
import { LoginService } from '../../../core/services/Account/login.service';
import { IBilling, Billing } from '../../../core/interfaces/Account/IBilling';
import { AccountService } from '../../../core/services/Account/account.service';
import { ILoginResponse } from '../../../core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordService } from '../../../core/services/Account/changePassword.service';
import { IUserResponse } from '../../../core/interfaces/Account/IUserResponse';
import { NewOrderService } from '../../../core/services/Store/newOrder.service';
import { INewOrderResponse } from '../../../core/interfaces/Store/INewOrderResponse';
import { billingInformation } from '../../../app/_mock/global';
import { CompleteOrderComponent } from '../../../app/account/stripe/complete-order/complete-order.component';
import { Router, RouterModule } from '@angular/router';
import { EmailChangeEmailService } from '../../../core/services/Account/emailChangeEmail.service';
import { BillingInfoService } from '../../../core/services/Account/billingInfo.service';
import { IStandardResponse } from '../../../core/interfaces/IStandardResponse';
import { OrdersService } from '../../../core/services/Store/orders.service';
import { IOrdersListResponse } from '../../../core/interfaces/Store/IOrdersListResponse';
import { IOrderDetailResponse } from '../../../core/interfaces/Store/IOrderDetailResponse';
import { IOrderDetail, OrderDetail } from '../../../core/interfaces/Store/IOrderDetail';
import { IBillingInfoResponse } from '../../../core/interfaces/Account/IBillingInfoResponse';
import { IOrder } from '../../../core/interfaces/Store/IOrder';
import { CountriesService } from '../../../core/services/Account/countries.service';
import { ICountryResponse } from '../../../core/interfaces/Account/ICountryResponse';
import { ICountry, Country } from '../../../core/interfaces/Account/ICountry';
import { IState, State } from '../../../core/interfaces/Account/IState';
import { ICity, City } from '../../../core/interfaces/Account/ICity';
import { StatesService } from '../../../core/services/Account/states.service';
import { CitiesService } from '../../../core/services/Account/cities.service';
import { IStateResponse } from '../../../core/interfaces/Account/IStateResponse';
import { ICityResponse } from '../../../core/interfaces/Account/ICityResponse';
import { datetimePicker } from '../../../app/_tools/datepicker/datepicker';
import { DatepickerComponent } from '../../../app/_tools/datepicker/datepicker.component';
import { template } from '../../../app/helper/global.mock';
import { UnsubscribeService } from '../../../core/services/Store/unsubscribe.service';
import { RenewSubscription } from '../../../core/services/Store/renewSubscription.service';
import { environment } from '../../../environments/environment';
import { Meta } from '@angular/platform-browser';
import { ColorPickerModule } from 'primeng/primeng';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { OrdersDetailService } from 'core/services/Store/order_detail.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'account-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
  providers: [DatepickerComponent, ImageCropperComponent,
    UnsubscribeService, RenewSubscription, Meta, OrdersDetailService]

})

export class ProfileComponent implements AfterViewInit {
  tmp_creation_timestamp: string;
  tmp_coupon: string;
  tmp_discount: Number;

  @ViewChild('input-file') el: ElementRef;
  @ViewChild('input-file-trigger') button: ElementRef;
  @ViewChild('file-return') the_return: ElementRef;


  ngAfterViewInit(): void {

    document.querySelector("html").classList.add('js');


    // this.button.nativeElement.addEventListener("keydown", function (event) {
    //   if (event.keyCode == 13 || event.keyCode == 32) {
    //     this.el.focus();
    //   }
    // });
    // this.button.nativeElement.addEventListener("click", function (event) {
    //   this.el.focus();
    //   return false;
    // });

    // this.el.nativeElement.addEventListener("change", function (event) {
    //   this.the_return.innerHTML = this.value;
    // });
  }

  closeResult: string;

  file: File;
  http: any;
  cropperSettings: CropperSettings;

  isState = true;
  newPassword: any;
  actualPassword: any;
  repeat_password: any;
  password: any;
  change_new_email: any;
  billing_country: any;
  billing_state: any;
  billing_city: any;
  errorMessage: any;
  response: ILoginResponse;
  orderResponse: INewOrderResponse;
  standarResponse: IStandardResponse;
  userResponse: IUserResponse;
  ordersListResponse: IOrdersListResponse;
  orderDetailResponse: IOrderDetailResponse;
  standardResponse: IStandardResponse;
  billingInfoResponse: IBillingInfoResponse;
  countriesResponse: ICountryResponse;
  statesResponse: IStateResponse;
  citiesResponse: ICityResponse;
  loading: boolean;
  isValid = true;
  message = 'Upload your profile photo';

  data: any;


  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;



  value = false;

  switch: boolean;
  color1: string;


  onFlagChange(event) {
    // this.value = !this.value;
    // if (this.value) {
    //   // this.createOrder();
    //   this.router.navigate(['/account/completeOrder']);
    // }
    this.changeState();


  }


  changeState() {

    if (this.state == 1) {
      this.unsubscribe();

    }
    if (this.state == 2) {
      this.router.navigate(['/account/completeOrder']);

    }
    if (this.state == 3) {
      this.renew_subscription();

    }


  }

  getIsState() {
    this.isState = !this.isState;

    return this.isState;
  }

  getIsState2() {
    this.changeState();

  }


  public user: ILogin;
  public billing_info: Billing;
  public editBillingInfo = true;
  public newemail = '';
  public url_image = '';
  public orders_list: any;
  public orders_detail: OrderDetail;
  public countries_list: ICountry[];

  public state: number;
  public onText = 'On';
  public offText = 'Off';
  public onColor = 'yellow';
  public offColor = 'red';
  public size = 'large';
  public disabled = false;

  public isShowPhoto = false;

  public countries: Array<Country> = [];
  public states: Array<State> = [];
  public cities: Array<City> = [];

  public countries_b: Array<Country> = [];
  public states_b: Array<State> = [];
  public cities_b: Array<City> = [];
  private _datetimePicker = new datetimePicker();
  public header: any;

  public deadline: any;

  isColors = false;

  public get_login() {
    // return currentUser['currentUser'];
    return <ILogin>JSON.parse(localStorage.getItem('currentUser'));
  }

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private _notification: NotificationsService,
    private createOrderService: NewOrderService,
    private unsubscribeService: UnsubscribeService,
    private renewSubscription: RenewSubscription,

    private changePasswordService: ChangePasswordService,
    private emailChangeEmailService: EmailChangeEmailService,
    private billingInfoService: BillingInfoService,
    private ordersService: OrdersService,
    private router: Router,
    private countryService: CountriesService,
    private stateService: StatesService,
    private cityService: CitiesService,
    private datepickerComponent: DatepickerComponent,
    private metaService: Meta,
    private _http: HttpClient,
    private orderDetailService: OrdersDetailService,
    private modalService: NgbModal

  ) {

    this.metaService.addTag({ property: 'title', content: 'Profile' });
    this.metaService.addTag({ property: 'description', content: 'Profile Page of Myklovr' });


    // this.getCountries(false);
    this._uploadUrl = environment.apiUrlPrefix + 'storage/upload/v2/PROFILE';
    //this._uploadUrl = 'http://172.16.10.159:8080/myklovr-webapi/rest/' + 'storage/upload/v2/PROFILE';
    this.getStates('USA', false);
    this.getStates('USA', true);
    this.billing_info = new Billing();


    //Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.fileType = 'image/jpeg';
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.cropperClass = 'btn';
    this.cropperSettings.croppingClass = 'btn';
// kmipl-sudhakar added         
this.cropperSettings.canvasWidth = 200;         
this.cropperSettings.canvasHeight = 200; 



    this.data = {};



  }
  private _uploadUrl;


  open(content, id) {
    this.getDetail(id, content);

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getStates('USA', false);
    this.getStates('USA', true);
    // this.getCountries(false);
    // this.getCountries(true);
    this.get_billing_info();
    this.getOrders();

    this.deadline = JSON.parse(localStorage.getItem('currentUser')).premium_deadline;

    this.header = [{ header: 'Authorization', value: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken }];

    this.setStatus();

    if (this.get_login()) {
      this.switch = (Boolean)(this.get_login().premium_status);
    } else {
      this.switch = false;
    }

    this.user = this.get_login();
    // if (this.user != null) {
    //   if (this.user.url_image === '') {
    //     this.url_image = 'assets/images/home/icons6c.png';
    //     if (this.user.gender === 'female') {
    //       this.url_image = 'assets/images/home/icons6c.png';
    //     }
    //   } else {
    //     this.url_image = this.user.url_image;
    //   }
    // } else {
    //   this.url_image = 'assets/images/home/icons6c.png';
    // }

    this.datepickerComponent.setDateJSON(this.user.birthday);
    this._datetimePicker = this.datepickerComponent.getDate();

  }



  toPlans() {
    this.router.navigate(['/account/plans']);
  }

  showColors() {
    this.isColors = !this.isColors;
  }

  setStatus() {
    let status = JSON.parse(localStorage.getItem('currentUser')).premium_status;
    console.log(status);


    if (status === "ACTIVE") {

      this.state = 1;
      this.value = true;

    }
    if (status === "INACTIVE") {
      this.state = 2;
      this.value = false;

    }
    if (status === "CANCELED") {
      this.state = 3;
      this.value = true;

    }
  }

  getValue() {
    return this.value;
  }

  get_url_image() {

    if (this.get_login() != null) {
      if (this.get_login().url_image === '') {
        this.url_image = 'assets/images/home/icons6c.png';
        if (this.get_login().gender === 'female') {
          this.url_image = 'assets/images/home/icons6c.png';
        }
      } else {
        this.url_image = this.get_login().url_image;
      }
      //  console.log(this.get_login());
      // console.log(currentUser['currentUser']);
    } else {
      this.url_image = 'assets/images/home/icons6c.png';
    }

    return this.url_image;
  }



  public showEditBillingInfo() {
    this.editBillingInfo = false;
    console.log(this.editBillingInfo);
    this.newemail = '';
    // this.getCountries(true);

  }
  public hideEditBillingInfo() {
    this.editBillingInfo = true;
    console.log(this.editBillingInfo);
    this.newemail = '';
  }
  createOrder() {

    // this.loading = true;

    this.createOrderService.newOrder()
      .subscribe(Response => {
        this.orderResponse = Response;
        if (this.response.response.code === 'AM0000') {
          this._notification.success('Order Created', this.orderResponse.response.message);
          billingInformation['billing'] = JSON.stringify(this.orderResponse.billing);
          billingInformation['order_id'] = JSON.stringify(this.orderResponse.order_id);
        } else {
          this._notification.error('Error creating order', this.orderResponse.response.message);
        }
        // this.loading = false;
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error creating order', this.orderResponse.response.message);
        // this.loading = false;
      });

  }

  fileChangeListener($event) {
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
    // let fileList: FileList = event.target.files;
    // if(fileList.length > 0) {
    // let file: File = fileList[0];
    // this.file = this.data;
    let formData: FormData = new FormData();

    formData.append('image', this.data.image);
    //console.log(formData.get('image'));
    let headers = new HttpHeaders();



    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
    const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };
    /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', bearer);
    // let options = new RequestOptions({ headers: this.header });

    this._http.post(`${this._uploadUrl}`, formData, options).map(res => res)
      .catch(error => Observable.throw(error))
      .subscribe(
      data => {
        console.log(data);
        this.url_image = data.storage_url;
        let login = <ILogin>JSON.parse(localStorage.getItem('currentUser'));
        login.url_image = this.url_image;
        localStorage.setItem('currentUser', JSON.stringify(login));
        this.clearImage();

      },
      error => console.log(error)
      )
    // }
  }


  clearImage() {

    this.file = null;

  }


  renew_subscription() {

    // this.loading = true;
    this.renewSubscription.RenewSubscription()
      .subscribe(Response => {
        this.response = Response;
        if (this.response.response.code === 'AM0000') {

          localStorage.setItem('currentUser', JSON.stringify(this.response.login));
          this.setStatus();
          this.getIsState();
        } else {
          this._notification.error('Error renewing subscribtion', this.orderResponse.response.message);
        }
        // this.loading = false;
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error renewing subscribtion', this.orderResponse.response.message);
        // this.loading = false;
      });

  }

  unsubscribe() {

    // this.loading = true;

    this.unsubscribeService.unsubscribe()
      .subscribe(Response => {
        this.response = Response;
        if (this.response.response.code === 'AM0000') {

          localStorage.setItem('currentUser', JSON.stringify(this.response.login));
          this.setStatus();

        } else {
          this._notification.error('Error unsubscribing', this.orderResponse.response.message);
        }
        // this.loading = false;
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error unsubscribing', this.orderResponse.response.message);
        // this.loading = false;
      });

  }

  showPhoto() {
    this.isShowPhoto = !this.isShowPhoto;
  }

  updateProfile(validation) {
    this.datepickerComponent.setDate(this._datetimePicker._day, this._datetimePicker._month, this._datetimePicker._year);
    const date = this.datepickerComponent.getDateJSON();

    if (date !== '') {
      this.user.birthday = date;
    } else {
      validation = false;
    }

    if (validation) {
      this.loading = true;

      this.accountService.putAccount(this.user.birthday, this.user.first_name, this.user.last_name, this.user.gender, this.user.url_image)
        .subscribe(Response => {
          this.response = Response;
          if (this.response.response.code === 'AM0000') {
            this._notification.success('Account updated', this.response.response.message);
            // localStorage.setItem('currentUser', JSON.stringify(this.response.login));
          } else {
            this._notification.error('Error updating Account', this.response.response.message);
          }
          this.loading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error updating Account', this.response.response.message);
          this.loading = false;
        });

    } else {

      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }

  }


  changePassword(validation) {

    if (validation) {
      this.loading = true;

      this.changePasswordService.changePassword(this.actualPassword, this.newPassword)
        .subscribe(Response => {
          this.userResponse = Response;
          if (this.userResponse.response.code === 'AM0000') {
            this._notification.success('Password changed', this.userResponse.response.message);

          } else {
            this._notification.error('Error changing password', 'Actual password doesn\'t match');

            this._notification.html('<div style="background:black;color:black">notificacion</div>');
          }
          this.loading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error changing password', this.userResponse.response.message);
          this.loading = false;
        });

    } else {

      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }

  }

  changeEmail(validation) {

    if (validation) {
      this.loading = true;

      this.emailChangeEmailService.emailChangeEmail(this.change_new_email)
        .subscribe(Response => {
          this.userResponse = Response;
          if (this.userResponse) {

            if (this.userResponse.response.code === 'AM0000') {
              this._notification.success('Confirmation sended', this.userResponse.response.message);

            } else {
              this._notification.error('Error sending confirmation', this.userResponse.response.message);
            }
          }
          this.loading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error sending confirmation', this.userResponse.response.message);
          this.loading = false;
        });

    } else {
      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }

  }

  changeThemeColor(color) {
    // alert(color);
    template['barColor'] = '' + color + '';

  }
  changeBackground(background) {
    // alert(color);
    template['pageBackground'] = '' + background + '';

  }

  updateBillingInfo(validation) {

    if (validation) {

      this.billingInfoService.putBillingInfo(this.billing_info.first_name, this.billing_info.last_name, this.billing_info.address, '',
        'USA', this.billing_info.state, this.billing_info.city,
        this.billing_info.zipcode, this.billing_info.company)
        .subscribe(Response => {
          this.standardResponse = Response;
          if (this.standardResponse.code === 'AM0000') {
            this._notification.success('Billing info updated', this.standardResponse.message);
            this.editBillingInfo = false;
            this.hideEditBillingInfo();
          } else {
            this._notification.error('Error updating billing info', this.standardResponse.message);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error updating billing info', this.standardResponse.message);
        });

    } else {
      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }

  }

  getOrders() {
    this.ordersService.getOrders()
      .subscribe(Response => {
        this.ordersListResponse = Response;
        if (this.ordersListResponse.response.code === 'AM0000') {
          this.orders_list = this.ordersListResponse.orders;

        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  //OrdersDetailService
  getDetail(order, content) {
this.tmp_discount = order.coupon_discount_amount;
this.tmp_coupon = order.coupon_code;
this.tmp_creation_timestamp = order.creation_timestamp;

    this.orderDetailService.getDetail(order.order_id)
      .subscribe(Response => {
        this.orderDetailResponse = Response;
        if (this.orderDetailResponse.response.code === 'AM0000') {
          this.orders_detail = new OrderDetail();
          this.orders_detail = this.orderDetailResponse.itemDetail[0];

          this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      },
      error => {
        this.errorMessage = <any>error;
      });

    if (this.orderDetailResponse) {



    }

  }

  get_billing_info() {
    this.billingInfoService.getBillingInfo()
      .subscribe(Response => {
        this.billingInfoResponse = Response;
        if (this.billingInfoResponse.response.code === 'AM0000') {
          this.billing_info = <IBilling>this.billingInfoResponse.billing;
          console.log(this.billing_info);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error loading billing info', this.ordersListResponse.response.message);
      });
  }

  getCountries(is_billing) {
    this.countryService.getCountries()
      .subscribe(Response => {
        this.countriesResponse = Response;
        if (this.countriesResponse.response.code === 'AM0000') {
          // this.countries_list = this.countriesResponse.countries;
          if (this.countriesResponse.countries[0]) {
            if (is_billing) {
              this.countries_b = this.countriesResponse.countries;
              this.getStates(this.billing_info.country, is_billing);
            } else {
              this.countries = this.countriesResponse.countries;
              this.getStates(this.countries[0].code, is_billing);
            }
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  getStates(code, is_billing) {
    this.stateService.getStates(code)
      .subscribe(Response => {
        this.statesResponse = Response;
        if (this.statesResponse.response.code === 'AM0000') {
          // this.countries_list = this.statesResponse.states;
          if (this.statesResponse.states[0]) {
            if (is_billing) {
              this.states_b = this.statesResponse.states;
              this.getCities(this.billing_info.state, is_billing);
            } else {
              this.states = this.statesResponse.states;
              this.getCities(this.states[0].code, is_billing);
            }
          } else {
            if (is_billing) {
              this.states_b = [];
            } else {
              this.states = [];
            }
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  getCities(code, is_billing) {
    this.cityService.getCities(code)
      .subscribe(Response => {
        this.citiesResponse = Response;
        if (this.citiesResponse.response.code === 'AM0000') {

          if (this.citiesResponse.cities) {
            if (is_billing) {
              this.cities_b = this.citiesResponse.cities;
            } else {
              this.cities = this.citiesResponse.cities;
            }
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  imageFinishedUploading(file: any) {
    console.log(JSON.stringify(file.serverResponse));
  }

  // onUploadFinished($event) {
  //   console.log('Finished');
  // }

  onUploadFinished($event) {
    console.log(JSON.parse($event.serverResponse._body).storage_url);
    this.url_image = JSON.parse($event.serverResponse._body).storage_url;
    let login = <ILogin>JSON.parse(localStorage.getItem('currentUser'));
    login.url_image = this.url_image;
    localStorage.setItem('currentUser', JSON.stringify(login));

  }

  onRemoved(file: any) {
    alert('Removed');
    // do some stuff with the removed file.
  }

  onUploadStateChanged(state: boolean) {
    console.log(JSON.stringify(state));
  }
  setCountry(code, is_billing) {
    this.getStates(code, is_billing);
  }

  setState(code, is_billing) {
    this.getCities(code, is_billing);
  }

  setCity(code, is_billing) {

  }

  onChangeCountry(value) {
    this.billing_country = value;
  }

  onChangeState(value) {
    this.billing_country = value;
  }

  onChangeCity(value) {
    this.billing_country = value;
  }

  setGender(value) {
    this.user.gender = value;
  }
}
