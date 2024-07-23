import { IsNotEmpty, isNotEmpty, IsNumber, isNumber, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator"

export class StockInsertDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(5)
    size:string

  @IsNumber()
  @IsNotEmpty()
  @Max(1000)
  @Min(1)
  @IsPositive()
  quantity: number

  @IsUUID()
  @IsNotEmpty()
  productId: string
}