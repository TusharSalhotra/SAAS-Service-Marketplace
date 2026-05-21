import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema } from './schemas/office.schema';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Office.name, schema: OfficeSchema }])],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService],
})
export class OfficesModule {}
