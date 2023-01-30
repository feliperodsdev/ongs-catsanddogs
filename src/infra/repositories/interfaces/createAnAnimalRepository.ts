import { ICreateAnAnimalParams } from "../../../domain/services/interfaces/createAnAnimalParams";

export interface ICreateAnAnimalRepository {
  create(params: ICreateAnAnimalParams): Promise<void>;
}
