import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  @IsNotEmpty()
  officeId!: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsInt()
  @Min(1)
  amountCents!: number;
}
