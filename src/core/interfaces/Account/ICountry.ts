export interface ICountry {

    language: string;
    code: string;
    name: string;

}


export class Country implements ICountry {

    constructor(
       public language: string,
       public code: string,
       public name: string
    ){

    }

}

