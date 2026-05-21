import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OfficeScopeGuard } from '../../common/multitenancy/office-scope.guard';
import { OfficeStatus, RoleName } from '../../common/enums';
import { Roles } from '../../common/rbac/roles.decorator';
import { CreateOfficeDto } from './dto/create-office.dto';
import { OfficesService } from './offices.service';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @Roles(RoleName.SuperAdmin)
  create(@Body() input: CreateOfficeDto) {
    return this.officesService.create(input);
  }

  @Get()
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin, RoleName.OfficeManager)
  findAll(@Query('status') status?: OfficeStatus) {
    return this.officesService.findAll(status);
  }

  @Get(':id')
  @UseGuards(OfficeScopeGuard)
  findOne(@Param('id') id: string) {
    return this.officesService.findOne(id);
  }

  @Post(':id/submit')
  @Roles(RoleName.OfficeAdmin, RoleName.SuperAdmin)
  @UseGuards(OfficeScopeGuard)
  submit(@Param('id') id: string) {
    return this.officesService.submit(id);
  }

  @Patch(':id/approve')
  @Roles(RoleName.SuperAdmin)
  approve(@Param('id') id: string) {
    return this.officesService.approve(id);
  }
}
