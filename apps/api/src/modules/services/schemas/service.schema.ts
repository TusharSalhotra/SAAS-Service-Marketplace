import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ServiceStatus } from '../../../common/enums';

export type MarketplaceServiceDocument = HydratedDocument<MarketplaceService>;

@Schema({ timestamps: true })
export class MarketplaceService {
  @Prop({ type: Types.ObjectId, ref: 'Office', required: true, index: true })
  officeId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  category!: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true, min: 1 })
  priceCents!: number;

  @Prop({ required: true, min: 1 })
  durationMinutes!: number;

  @Prop({ type: [String], default: [] })
  staffIds!: string[];

  @Prop({ type: Object, default: {} })
  availability!: Record<string, unknown>;

  @Prop({ enum: ServiceStatus, default: ServiceStatus.Draft, index: true })
  status!: ServiceStatus;
}

export const MarketplaceServiceSchema = SchemaFactory.createForClass(MarketplaceService);
