import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PaymentStatus } from '../../../common/enums';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Office', required: true, index: true })
  officeId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'OfficeClient', index: true })
  clientId?: Types.ObjectId;

  @Prop({ required: true })
  provider!: 'stripe';

  @Prop({ required: true, min: 1 })
  amountCents!: number;

  @Prop({ required: true, min: 0 })
  platformFeeCents!: number;

  @Prop({ required: true, min: 0 })
  officeNetCents!: number;

  @Prop({ default: 0, min: 0 })
  processorFeeCents!: number;

  @Prop({ enum: PaymentStatus, default: PaymentStatus.Pending, index: true })
  status!: PaymentStatus;

  @Prop()
  providerPaymentIntentId?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
