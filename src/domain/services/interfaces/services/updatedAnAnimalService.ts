import { IUpdateAnimalParams } from "../updatedAnimalParams";

export interface IUpdateAdoptedAnimalService {
  update(params: IUpdateAnimalParams): Promise<string>;
}
