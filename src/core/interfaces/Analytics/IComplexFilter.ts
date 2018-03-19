import {FilterParameter, IFilterParameter} from 'core/interfaces/Analytics/IFilterParameter';
import {FilterParameterGroup, IFilterParameterGroup} from 'core/interfaces/Analytics/IFilterParameterGroup';

export interface IComplexFilter {
    filter_groups: Array<IFilterParameterGroup>;
    limit: number;
    orderby: IFilterParameter;
}
export class ComplexFilter implements IComplexFilter {
  constructor(
    public filter_groups: Array<FilterParameterGroup>,
    public limit: number,
    public orderby: FilterParameter

  ){}
}
