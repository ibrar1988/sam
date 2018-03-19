import {FilterParameter, IFilterParameter} from 'core/interfaces/Analytics/IFilterParameter';

export interface IFilterParameterGroup {
    parameters: Array<IFilterParameter>;
    nextOperator: String;
}

export class FilterParameterGroup implements IFilterParameterGroup{
  constructor(
  public  parameters: Array<FilterParameter>,
  public nextOperator: String
  ){}
}
