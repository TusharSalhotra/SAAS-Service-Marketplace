import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketplaceService, MarketplaceServiceSchema } from './schemas/service.schema';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MarketplaceService.name, schema: MarketplaceServiceSchema }])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
