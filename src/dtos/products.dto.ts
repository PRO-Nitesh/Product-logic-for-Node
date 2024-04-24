/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public product_name: string;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public product_name: string;
}
