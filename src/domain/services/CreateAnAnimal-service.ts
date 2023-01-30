export class CreateAnAnimalService implements ICreateAnAnimalService {
  constructor(
    private readonly createAnAnimalRepository: ICreateAnAnimalRepository
  ) {}
  async create(params: ICreateAnAnimalParams): Promise<void> {
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

    await this.createAnAnimalRepository.create(params);
  }
}
