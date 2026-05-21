import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleName } from '../../common/enums';
import { Roles } from '../../common/rbac/roles.decorator';
import { AuthService } from './auth.service';

class CreateInviteDto {
  @IsEmail()
  email!: string;

  @IsEnum(RoleName)
  role!: RoleName;

  @IsOptional()
  @IsString()
  officeId?: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  me() {
    return this.authService.getCurrentUser();
  }

  @Post('invites')
  @Roles(RoleName.SuperAdmin, RoleName.OfficeAdmin)
  invite(@Body() input: CreateInviteDto) {
    return this.authService.createInvitation(input);
  }
}
