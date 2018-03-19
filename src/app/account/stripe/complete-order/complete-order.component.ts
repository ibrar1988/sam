import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteOrderStripeService } from 'core/services/Store/completeOrderStripe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { billingInformation } from 'app/_mock/global';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { IBilling, Billing } from 'core/interfaces/Store/IBilling';
import { NewOrderService } from 'core/services/Store/newOrder.service';
import { INewOrderResponse } from 'core/interfaces/Store/INewOrderResponse';
import { ICompleteOrderResponse } from 'core/interfaces/Store/ICompleteOrderResponse';
import { ShoppingCart } from 'core/interfaces/Store/IShoppingCart';
import { CartItem } from 'core/interfaces/Store/ICartItem';
import { CompleteOrderStripeRequest, ICompleteOrderStripeRequest } from 'core/interfaces/Store/ICompleteOrderStripeRequest';
import { CountriesService } from 'core/services/Account/countries.service';
import { StatesService } from 'core/services/Account/states.service';
import { CitiesService } from 'core/services/Account/cities.service';
import { Country } from 'core/interfaces/Account/ICountry';
import { State } from 'core/interfaces/Account/IState';
import { City } from 'core/interfaces/Account/ICity';
import { ICountryResponse } from 'core/interfaces/Account/ICountryResponse';
import { ICityResponse } from 'core/interfaces/Account/ICityResponse';
import { IStateResponse } from 'core/interfaces/Account/IStateResponse';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { ValidateCouponService } from 'core/services/Store/validateCoupon.service';
import { ICouponResponse } from 'core/interfaces/Store/ICouponResponse';
import { ZipCodeService } from 'core/services/Account/zipCode.service';

import { TagAdderService } from 'core/services/helper/tagAdder.service';


@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.css'],
  providers: [CompleteOrderStripeService, NewOrderService,
    NewOrderService, CountriesService, StatesService, CitiesService, ValidateCouponService,
    ZipCodeService, TagAdderService]
})

export class CompleteOrderComponent implements OnInit {
  isZipCodeValid: Boolean;
  coupon = '';
  couponValidated = 0;
  item = 'monthly';
  SelectedValue: any;
  cvc: any;
  expiryYear: any;
  expiryMonth: any;
  cardNumber: any;
  message: string;
  finishOrder: Boolean = null;

  public token = '';
  public completeOrderResponse: ICompleteOrderResponse;
  public newOrderResponse: INewOrderResponse;
  public errorMessage: any;

  public cartItem: CartItem;
  public shoppingCart: ShoppingCart;

  public standarResponse: IStandardResponse;
  public couponResponse: ICouponResponse;
  public loginResponse: ILoginResponse;
  public billing: IBilling;
  public billingRequest: Billing = new Billing('', '', '', '', '', '', '', '', '', '');
  public completeOrderStripeRequest: CompleteOrderStripeRequest;

  public selectedProductCode = '';

  public orderId: string = '';

  public stripeToken = '';

  public name: string;
  public lastname: string;
  public company: string;
  public address: string;
  public city: string;
  public country: string;
  public state: string;
  public zipcode: string;

  public price: number;
  public product_name = '';
  public username: string;
  public isPremium = false;

  public countries: Array<Country> = [];
  public states: Array<State> = [];
  public cities: Array<City> = [];

  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;

  discount = 0;

  uncomplete = false;



  countriesResponse: ICountryResponse;
  statesResponse: IStateResponse;
  citiesResponse: ICityResponse;

  billing_country: any;
  billing_state: any;
  billing_city: any;


  constructor(
    public completeOrderStripe: CompleteOrderStripeService,
    private _notification: NotificationsService,
    private newOrderService: NewOrderService,
    private countryService: CountriesService,
    private stateService: StatesService,
    private cityService: CitiesService,
    private _router: Router,
    private addCouponService: ValidateCouponService,
    private zipCodeService: ZipCodeService,
    private tagAdderService:TagAdderService
  ) {
    // this.getCountries();
    // this.getStates('USA');
  }

  order: string;


  ngOnInit() {
    // this.getCountries();
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;

    this.createOrder();
    this.selectedProductCode = environment.montly_code;
    this.price = 9.99;
    this.isPremium = false;
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    this.setShoppingCart('monthly');
    // this.getStates('USA');
    // this.order = billingInformation['billing'];
    this.tagAdderService.addTag('fbq("track", "InitiateCheckout")');
   


  }

  toStep1() {

    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }

  toStep2() {

    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;
  }

  toStep3() {

    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
    this.step4 = false;
  }

  toStep4() {

    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = true;
  }

  validateStep1() {
    if (this.billingRequest.first_name && this.billingRequest.last_name) {
      return true;

    } else {
      this.uncomplete = true;
      return false;
    }
  }

  validateStep2() {

    if (this.billingRequest.state != undefined && this.billingRequest.city != undefined && this.billingRequest.zipcode != undefined) {
    
        return true;
    
    } else {
      this.uncomplete = true;
      return false;
    }
  }

  validateStep3() {

  }

  validateStep4() {

  }


  toNext() {
    if (this.step1 && this.validateStep1()) {
      this.toStep2();
      return;
    }
    if (this.step2 && this.validateStep2()) {
      this.validateZipCode();
      } 

    
    if (this.step3) {
      this.toStep4();
      return;
    }
  }

  toBack() {
    if (this.step2) {
      this.toStep1();
      return;
    }
    if (this.step3) {
      this.toStep2();
      return;
    }
    if (this.step4) {
      this.toStep3();
      return;
    }

  }

  validateZipCode() {

    this.zipCodeService.validateZipCode(this.billingRequest.state, this.billingRequest.zipcode).subscribe(data => {
      if (data.code == 'AM0000') {
        this.isZipCodeValid = true;
        this.toStep3();
    

      } else {
        this.isZipCodeValid = false;
        this._notification.error('Invalid Zip Code','Change your Zip Code');
   
      }
    },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error Complete Order', this.errorMessage);
      
      });

  
    
  }


  onChange(deviceValue) {

    this.setShoppingCart(deviceValue);
    this.item = deviceValue;


  }
  onStep1Next($event) {

  }
  onStep2Next($event) {

  }
  onStep3Next($event) {

  }

  onComplete($event) {

  }


  choosePlan() {
    this.isPremium = true;
  }

  setShoppingCart(deviceValue) {
    if (deviceValue === 'monthly') {
      this.selectedProductCode = environment.montly_code;
      this.product_name = 'Monthly Subscription”';
      this.price = 19.99;
    } else {
      this.selectedProductCode = environment.annual_code;
      this.product_name = 'Annual Subscription”';
      this.price = 199.99;
    }
    this.cartItem = new CartItem(this.selectedProductCode, '', 1);
    let cartItems = new Array<CartItem>();
    cartItems.slice(0, cartItems.length);
    cartItems.push(this.cartItem);
    this.shoppingCart = new ShoppingCart(cartItems, '', '');

  }

  // this.model.billing = order_stripe.billing;
  // this.model.order_id = order_stripe.order_id;
  // this.model.cart = order_stripe.cart;
  // this.model.stripeToken = order_stripe.stripeToken;
  //store/validateCoupon/
  public completeOrder(orderRequest: ICompleteOrderStripeRequest) {

    this.completeOrderStripe.getCompleteOrderStripe(orderRequest)
      .subscribe(order => {
        this.loginResponse = order;

        if (this.loginResponse.response.code === 'AM0000') {
          this._notification.success('Success Complete Order', this.loginResponse.response.message);

          localStorage.setItem('currentUser', JSON.stringify(this.loginResponse.login));
          this.finishOrder = true;

        } else {
          this.finishOrder = false;
          this._notification.error('Error Complete Order', this.loginResponse.response.message);
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error Complete Order', this.errorMessage);
      });

  }

  public verifyCoupon() {



  }



  openCheckout() {
    let token = '';
    let value = (this.price - this.discount).toFixed(2);
    let price = value.toString().replace('.', '');
    let username = this.username;
    let product_name = this.product_name;

    let handler = (<any>window).StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: token => {
        // this.token = token;
        this.setCompleteOrderStripeRequest(token);
      }
      // token: function (token: any) {
      //   // this.billingRequest = new Billing('', '', this.billingRequest.name, this.billingRequest.lastname, this.billingRequest.company
      //   //   , this.billingRequest.address, this.billingRequest.city, this.billingRequest.country, this.billingRequest.state, this.billingRequest.zipcode);
      //   // setToken(token);
      //   // this.token = token;
      //   this.message = `Success! Card token ${token.id}.`;
      //   this.token = token.id;

      //   //this.setCompleteOrderStripeRequest(token.id);
      //   alert("Token : "+this.token);

      //   this.setCompleteOrderStripeRequest();
      // }
    });

    handler.open({
      email: username,
      name: product_name,
      description: 'Pay ' + value.toString() + ' + Tax',
      // amount: Number(price)
    });
  }


  isToken() {
    if (this.token !== '') {
      return true;
    } else {
      return false;
    }
  }

  setCompleteOrderStripeRequest(token) {
    let coupon = null;
    if (this.couponValidated == 1) {
      coupon = this.coupon;
    }
    //    alert('Token : ' + this.token);
    this.completeOrderStripeRequest = new CompleteOrderStripeRequest(this.billingRequest,
      this.orderId, token.id, this.shoppingCart, coupon);

    this.completeOrder(this.completeOrderStripeRequest);

    return '';
  }




  // getToken() {
  //   this.message = 'Loading...';

  //   (<any>window).Stripe.card.createToken({
  //     number: this.cardNumber,
  //     exp_month: this.expiryMonth,
  //     exp_year: this.expiryYear,
  //     cvc: this.cvc
  //   }, (status: number, response: any) => {
  //     if (status === 200) {
  //       this.message = `Success! Card token ${response.card.id}.`;
  //     } else {
  //       this.message = response.error.message;
  //     }
  //   });
  // }

  addCoupon() {

    this.addCouponService.getVerifyCoupon(this.coupon)
      .subscribe(Response => {
        this.couponResponse = Response;
        if (this.couponResponse.response.code == 'AM0000' && this.couponResponse.coupon.valid) {
          this.couponValidated = 1;
          this.discount = this.couponResponse.coupon.discount_amount_off;

          if (this.discount == 0) {

            this.discount = this.price * (this.couponResponse.coupon.percent_off / 100);

          }

        } else {
          this.couponValidated = 2;
          this._notification.error('Invalid Coupon', this.couponResponse.response.message);

        }

      },
      error => {
        this.couponValidated = 0;
        this.errorMessage = <any>error;
        this._notification.error('Error validating Coupon', this.errorMessage);
        // this.loading = false;
      });
  }

  createOrder() {

    this.newOrderService.newOrder()
      .subscribe(Response => {
        this.newOrderResponse = Response;
        if (this.newOrderResponse.response.code === 'AM0000') {
          this.billingRequest = this.newOrderResponse.billing;
          this.getStates('USA');
          // alert(this.billingRequest);
          this.orderId = this.newOrderResponse.order_id;
          // alert(this.orderId);
        } else {
          this._notification.error('Error creating order', this.newOrderResponse.response.message);
          //redirect to home
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error creating order', this.errorMessage);
        // this.loading = false;
      });
  }

  checkout() {
    this.openCheckout();
  }

  getCountries() {
    this.countryService.getCountries()
      .subscribe(Response => {
        this.countriesResponse = Response;
        if (this.countriesResponse.response.code === 'AM0000') {
          // this.countries_list = this.countriesResponse.countries;
          if (this.countriesResponse.countries[0]) {

            this.countries = this.countriesResponse.countries;
            this.getStates('USA');

          }
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  getStates(code) {
    this.stateService.getStates(code)
      .subscribe(Response => {
        this.states = Response.states;
        if (Response.response.code === 'AM0000') {
          // this.countries_list = this.statesResponse.states;
          if (this.states.length > 0) {

            if (this.SelectedValue != undefined) {
              this.getCities(this.SelectedValue);

            } else {
              this.getCities(this.billingRequest.state);

            }

          } else {

            this.states = [];

          }
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  getCities(code) {
    if (code) {
      this.cityService.getCities(code)
        .subscribe(Response => {
          // this.cities = Response.cities;
          if (Response.response.code === 'AM0000') {
            if (Response.cities.length > 0) {
              this.cities = Response.cities;

            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
    }
  }

  setCountry(code) {
    this.getStates(code);
  }

  setState(code) {
    this.SelectedValue = code;
    this.getCities(this.SelectedValue);
  }

  setCity(code) {

  }

  onChangeCountry(value) {
    this.billing_country = value;
  }

  onChangeState(value) {
    this.billing_state = value;
  }

  onChangeCity(value) {
    this.billing_city = value;
  }


}
