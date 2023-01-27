import { prisma } from "../../domain/Prisma-client";
import { IAppendUserToServicePointParams } from "../../domain/services/interfaces/appendUserToServicePoint";
import { IAppendUserToServicePointRepository } from "./interfaces/appendUserToServicePointRepository";
import { ILoadUserByIdRepository } from "./interfaces/loadUserById";

export class AppendUserServicepointRepository
  implements IAppendUserToServicePointRepository
{
  private loadUserByUserById: ILoadUserByIdRepository;
  constructor(loadUserByUserById: ILoadUserByIdRepository) {
    this.loadUserByUserById = loadUserByUserById;
  }
  async append(params: IAppendUserToServicePointParams): Promise<void> {
    await prisma.user.updateMany({
      where: {
        id: params.user_id,
      },
      data: {
        service_point_id: params.service_point_id,
      },
    });
    const updatedUser = await this.loadUserByUserById.load(params.user_id);
    if (updatedUser?.service_point_id != params.service_point_id)
      throw new Error("dbError");
  }
}
