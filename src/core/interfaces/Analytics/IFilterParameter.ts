export interface IFilterParameter {
    column: String;
    value: String;
    value_type: String;
    nextOperator: String;
}

export class FilterParameter implements IFilterParameter {

  constructor(
    public column: String,
    public value: String,
    public value_type: String,
    public nextOperator: String
  ){}


}
