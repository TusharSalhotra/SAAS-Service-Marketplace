import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Payment } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private readonly config: ConfigService,
  ) {}

  calculateSplit(amountCents: number) {
    const feePercent = this.config.get<number>('PLATFORM_FEE_PERCENT', 15);
    const platformFeeCents = Math.round(amountCents * (feePercent / 100));
    return {
      amountCents,
      platformFeePercent: feePercent,
      platformFeeCents,
      officeNetCents: amountCents - platformFeeCents,
    };
  }

  async createCheckout(input: CreateCheckoutDto) {
    const split = this.calculateSplit(input.amountCents);
    const payment = await this.paymentModel.create({
      officeId: new Types.ObjectId(input.officeId),
      clientId: input.clientId ? new Types.ObjectId(input.clientId) : undefined,
      provider: 'stripe',
      ...split,
    });

    return {
      checkoutMode: 'stripe_connect',
      payment,
      applicationFeeAmount: split.platformFeeCents,
      connectedAccountRequirement: 'office.paymentAccountId must be completed before live checkout',
    };
  }

  recordWebhook(eventType: string) {
    return {
      received: true,
      eventType,
      signatureVerified: 'configure STRIPE_WEBHOOK_SECRET before enabling live traffic',
    };
  }

  findAll() {
    return this.paymentModel.find().sort({ createdAt: -1 }).limit(100).lean();
  }
}
