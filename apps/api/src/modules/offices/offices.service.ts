import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfficeStatus } from '../../common/enums';
import { CreateOfficeDto } from './dto/create-office.dto';
import { Office } from './schemas/office.schema';

@Injectable()
export class OfficesService {
  constructor(@InjectModel(Office.name) private readonly officeModel: Model<Office>) {}

  create(input: CreateOfficeDto) {
    return this.officeModel.create(input);
  }

  findAll(status?: OfficeStatus) {
    const filter = status ? { status } : {};
    return this.officeModel.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string) {
    const office = await this.officeModel.findById(id).lean();
    if (!office) throw new NotFoundException('Office not found.');
    return office;
  }

  submit(id: string) {
    return this.officeModel.findByIdAndUpdate(id, { status: OfficeStatus.Submitted }, { new: true }).lean();
  }

  approve(id: string) {
    return this.officeModel.findByIdAndUpdate(id, { status: OfficeStatus.Active }, { new: true }).lean();
  }
}
