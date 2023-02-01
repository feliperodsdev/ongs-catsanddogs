import { AnimalModel } from "../../models/animalModel";

export interface ILoadAnimalByIdRepository {
  load(animal_id: number): Promise<AnimalModel | null>;
}
