import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator"

export class ProductUpdateDto {

    @IsString()
    @IsOptional()
    @MaxLength(255)
    @MinLength(3)
    title: string


    @IsString()
    @IsOptional()
    @MaxLength(1000)
    @MinLength(3)
    description:  string

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(100)
    @IsPositive()
    price: number

    @IsOptional()
    @IsString()
    image : string

    @IsUUID()
    @IsOptional()
    CategoryId: string

    @IsUUID()
    @IsOptional()
    typeId: string
    
}