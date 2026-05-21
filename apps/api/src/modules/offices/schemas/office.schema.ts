import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OfficeStatus } from '../../../common/enums';

export type OfficeDocument = HydratedDocument<Office>;

@Schema({ timestamps: true })
export class Office {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ enum: OfficeStatus, default: OfficeStatus.Draft, index: true })
  status!: OfficeStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  ownerUserId?: Types.ObjectId;

  @Prop({ type: Object, default: {} })
  address!: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  contact!: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  branding!: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  businessHours!: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  settings!: Record<string, unknown>;

  @Prop()
  paymentAccountId?: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
