import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { OfficesModule } from './modules/offices/offices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['apps/api/.env', '.env'], isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://127.0.0.1:27017/service-marketplace'),
      }),
    }),
    AuthModule,
    OfficesModule,
    ClientsModule,
    ServicesModule,
    PaymentsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
