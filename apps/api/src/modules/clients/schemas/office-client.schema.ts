import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OfficeClientDocument = HydratedDocument<OfficeClient>;

@Schema({ timestamps: true })
export class OfficeClient {
  @Prop({ type: Types.ObjectId, ref: 'Office', required: true, index: true })
  officeId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, lowercase: true, trim: true, index: true })
  email!: string;

  @Prop({ default: 'invited', index: true })
  status!: 'invited' | 'active' | 'approval_required' | 'deactivated';

  @Prop({ default: 'manual' })
  onboardingSource!: 'manual' | 'invite' | 'public_portal' | 'import';

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ type: Object, default: {} })
  consent!: Record<string, unknown>;

  @Prop()
  notes?: string;
}

export const OfficeClientSchema = SchemaFactory.createForClass(OfficeClient);
