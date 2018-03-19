export interface IState {

    language: string;
    country_code: string;
    code: string;
    name: string;
}

export class State implements IState {

    constructor(
        public language: string,
        public country_code: string,
        public code: string,
        public name: string

    ) {

    }

}
