import {  IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator"

export class ProductInsertDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    title: string


    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    @MinLength(3)
    description:  string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100)
    @IsPositive()
    price: number

    @IsNotEmpty()
    @IsString()
    image : string

    @IsUUID()
    @IsNotEmpty()
    categoryId : string

    @IsUUID()
    @IsNotEmpty()
    typeId : string
    
    
}