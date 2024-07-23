import { IsNotEmpty, isNotEmpty, IsNumber, isNumber, IsOptional, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator"

export class StockUpdateDto {

    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(5)
    size:string

  @IsNumber()
  @IsOptional()
  @Max(1000)
  @Min(1)
  @IsPositive()
  quantity: number

  @IsUUID()
  @IsOptional()
  productId: string
}