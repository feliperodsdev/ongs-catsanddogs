import { ICreateAnAnimalParamsRepository } from "../Prisma-CreateAn-Animal";

export interface ICreateAnAnimalRepository {
  create(params: ICreateAnAnimalParamsRepository): Promise<void>;
}
