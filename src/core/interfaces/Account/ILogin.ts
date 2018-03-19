export interface ILogin {
     login_type?: string;
     sessionToken?: string;
     user_id?: string;
     username: string;
     facebookid: string;
     password?: string;
     email_validated?: boolean;
     kind?: string;
     first_name: string;
     last_name: string;
     gender: string;
     birthday?: string;
     url_image: string;
     wrongpasswordcounter: number;
     account_blocked?: boolean;
     creation_timestamp?: Date;
     premium_deadline?: Date;
     premium_status?: string;
     user_roles?: Array<string>;
     billing_id?: string;
     trainning_status?: string;
     grade?: string;
}

export class Login implements ILogin {

    constructor(
       public login_type: string,
       public sessionToken: string,
       public user_id: string,
       public username: string,
       public facebookid: string,
       public password: string,
       public email_validated: boolean,
       public kind: string,
       public first_name: string,
       public last_name: string,
       public gender: string,
       public birthday: string,
       public url_image: string,
       public wrongpasswordcounter: number,
       public account_blocked: boolean,
       public creation_timestamp: Date,
       public premium_deadline: Date,
       public premium_status: string,
       public user_roles: Array<string>,
       public billing_id: string,
       public trainning_status: string,
       public grade: string
    ) {

    }


}
