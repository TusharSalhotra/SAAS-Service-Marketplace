import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { OfficeClient, OfficeClientSchema } from './schemas/office-client.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OfficeClient.name, schema: OfficeClientSchema }])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
