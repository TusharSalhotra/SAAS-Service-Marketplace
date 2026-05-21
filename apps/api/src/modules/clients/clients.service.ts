import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { OfficeClient } from './schemas/office-client.schema';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(OfficeClient.name) private readonly clientModel: Model<OfficeClient>) {}

  create(officeId: string, input: CreateClientDto) {
    return this.clientModel.create({ ...input, officeId: new Types.ObjectId(officeId), status: 'invited' });
  }

  findForOffice(officeId: string) {
    return this.clientModel.find({ officeId }).sort({ createdAt: -1 }).lean();
  }
}
