import { ICreateAnAnimalRepository } from "../../infra/repositories/interfaces/createAnAnimalRepository";
import { ILoadServicePointByIdRepository } from "../../infra/repositories/interfaces/loadServicePointByIdRepository";
import { ILoadUserByIdRepository } from "../../infra/repositories/interfaces/loadUserById";
import { Cat } from "../entities/Cat";
import { Dog } from "../entities/Dog";
import { ICreateAnAnimalParams } from "./interfaces/createAnAnimalParams";
import { ICreateAnAnimalService } from "./interfaces/services/createAnAnimal";

export class CreateAnAnimalService implements ICreateAnAnimalService {
  private createAnAnimalRepository: ICreateAnAnimalRepository;
  private loadServicePointByIdRepository: ILoadServicePointByIdRepository;
  private loadUserByIdRepository: ILoadUserByIdRepository;
  constructor(
    createAnAnimalRepository: ICreateAnAnimalRepository,
    loadServicePointByIdRepository: ILoadServicePointByIdRepository,
    loadUserByIdRepository: ILoadUserByIdRepository
  ) {
    this.createAnAnimalRepository = createAnAnimalRepository;
    this.loadServicePointByIdRepository = loadServicePointByIdRepository;
    this.loadUserByIdRepository = loadUserByIdRepository;
  }
  async create(params: ICreateAnAnimalParams): Promise<string> {
    try {
      let animalToBeCreated;
      const breed = params.breed;
      if (params.specie == 1) {
        animalToBeCreated = new Cat(
          { ...params, arrivedDate: new Date() },
          { breed: breed }
        );
      }
      animalToBeCreated = new Dog(
        { ...params, arrivedDate: new Date() },
        { breed: breed }
      );

      const user = await this.loadUserByIdRepository.load(params.user_id);

      if (!user) return "userNeedToBeInAnServicePoint";

      const isValidServicePointId =
        await this.loadServicePointByIdRepository.load(params.service_point_id);

      if (!isValidServicePointId) return "invalidServicePointId";

      const animalProps = animalToBeCreated.getProps;

      await this.createAnAnimalRepository.create({
        name: animalProps.name,
        specie: animalProps.specie,
        weight: animalProps.weight,
        sickness: animalProps.sickness,
        desc: params.desc,
        castrated: animalProps.castrated,
        breed: params.breed,
        user_id: params.user_id,
        service_point_id: params.service_point_id,
        approxAge: animalProps.approxAge,
        arrivedDate: animalProps.arrivedDate,
      });
      return "created";
    } catch (e) {
      return "dbError";
    }
  }
}
