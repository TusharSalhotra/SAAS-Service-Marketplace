import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  platform() {
    return {
      gmvCents: 84260000,
      platformCommissionCents: 12639000,
      activeOffices: 128,
      pendingEnrollments: 37,
      paymentSuccessRate: 0.978,
      topWidgets: ['revenue_trend', 'office_ranking', 'refunds_disputes'],
    };
  }

  office(officeId: string) {
    return {
      officeId,
      revenueCents: 8642000,
      serviceSales: 756,
      activeClients: 428,
      repeatClientRate: 0.42,
      payoutStatus: 'connected_account_ready',
      topWidgets: ['booking_calendar', 'top_services', 'staff_performance'],
    };
  }
}
