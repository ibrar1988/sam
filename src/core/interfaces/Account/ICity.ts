export interface ICity {
    state_code: string;
    city_name: string;
    language: string;
}
export class City implements ICity {

    constructor(
        public state_code: string,
        public city_name: string,
        public language: string
    ) {

    }

}
