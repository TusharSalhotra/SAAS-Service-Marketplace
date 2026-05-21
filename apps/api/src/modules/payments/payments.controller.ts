import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { RoleName } from '../../common/enums';
import { Roles } from '../../common/rbac/roles.decorator';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout/session')
  createCheckout(@Body() input: CreateCheckoutDto) {
    return this.paymentsService.createCheckout(input);
  }

  @Post('payments/webhook')
  webhook(@Headers('stripe-signature') signature: string | undefined, @Body() body: { type?: string }) {
    return this.paymentsService.recordWebhook(signature ? body.type ?? 'unknown' : 'missing_signature');
  }

  @Get('payments')
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin)
  findAll() {
    return this.paymentsService.findAll();
  }
}
