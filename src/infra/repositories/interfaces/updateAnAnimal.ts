import { IUpdateAnimalParams } from "../../../domain/services/interfaces/updatedAnimalParams";

export interface IUpdateAdoptedAnimalRepository {
  update(params: IUpdateAnimalParams): Promise<void>;
}
