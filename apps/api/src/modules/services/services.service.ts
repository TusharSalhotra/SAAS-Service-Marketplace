import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ServiceStatus } from '../../common/enums';
import { CreateServiceDto } from './dto/create-service.dto';
import { MarketplaceService } from './schemas/service.schema';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(MarketplaceService.name) private readonly serviceModel: Model<MarketplaceService>) {}

  create(officeId: string, input: CreateServiceDto) {
    return this.serviceModel.create({ ...input, officeId: new Types.ObjectId(officeId) });
  }

  findForOffice(officeId: string) {
    return this.serviceModel.find({ officeId }).sort({ createdAt: -1 }).lean();
  }

  publish(id: string) {
    return this.serviceModel.findByIdAndUpdate(id, { status: ServiceStatus.Published }, { new: true }).lean();
  }
}
