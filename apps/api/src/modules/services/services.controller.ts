import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoleName } from '../../common/enums';
import { OfficeScopeGuard } from '../../common/multitenancy/office-scope.guard';
import { Roles } from '../../common/rbac/roles.decorator';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';

@Controller()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('offices/:officeId/services')
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin, RoleName.OfficeManager)
  @UseGuards(OfficeScopeGuard)
  create(@Param('officeId') officeId: string, @Body() input: CreateServiceDto) {
    return this.servicesService.create(officeId, input);
  }

  @Get('offices/:officeId/services')
  @UseGuards(OfficeScopeGuard)
  findForOffice(@Param('officeId') officeId: string) {
    return this.servicesService.findForOffice(officeId);
  }

  @Patch('services/:id/publish')
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin, RoleName.OfficeManager)
  publish(@Param('id') id: string) {
    return this.servicesService.publish(id);
  }
}
