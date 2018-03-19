import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserPortfolioContainer } from 'core/interfaces/Portfolio/IUserPortfolioContainer';

export interface IUserPortfolioContainerResponse {

    response: IStandardResponse;
    container: IUserPortfolioContainer;

}
