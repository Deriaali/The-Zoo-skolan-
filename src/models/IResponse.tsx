import { IAnimal } from "./IAnimal";

export interface IResponse {
  animal?: IAnimal;
  error: string;
}
