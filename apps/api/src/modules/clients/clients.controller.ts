import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleName } from '../../common/enums';
import { OfficeScopeGuard } from '../../common/multitenancy/office-scope.guard';
import { Roles } from '../../common/rbac/roles.decorator';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('offices/:officeId/clients')
@UseGuards(OfficeScopeGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin, RoleName.OfficeManager)
  create(@Param('officeId') officeId: string, @Body() input: CreateClientDto) {
    return this.clientsService.create(officeId, input);
  }

  @Get()
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin, RoleName.OfficeManager)
  findForOffice(@Param('officeId') officeId: string) {
    return this.clientsService.findForOffice(officeId);
  }
}
