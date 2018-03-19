export interface ICoupon {

    code: String;
    discount_amount_off: number;
    coupon_created: String;
    duration: String;
    duration_in_months: number;
    max_redemptions: number;
    percent_off: number;
    times_redeemed: number;
    valid: Boolean;
    creation_timestamp: String;
}
