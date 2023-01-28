import { ICreateAnAnimalParams } from "../../createAnAnimalParams";

export interface ICreateAnAnimalService {
  create(params: ICreateAnAnimalParams): Promise<void>;
}
