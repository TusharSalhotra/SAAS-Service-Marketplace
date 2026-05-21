import { Controller, Get, Param } from '@nestjs/common';
import { RoleName } from '../../common/enums';
import { Roles } from '../../common/rbac/roles.decorator';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('platform')
  @Roles(RoleName.SuperAdmin)
  platform() {
    return this.analyticsService.platform();
  }

  @Get('offices/:officeId')
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin, RoleName.OfficeManager)
  office(@Param('officeId') officeId: string) {
    return this.analyticsService.office(officeId);
  }
}
