import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class CreateOfficeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @Matches(/^[a-z0-9-]{3,64}$/)
  slug!: string;

  @IsObject()
  address!: Record<string, unknown>;

  @IsObject()
  contact!: Record<string, unknown>;

  @IsOptional()
  @IsEmail()
  adminEmail?: string;
}
