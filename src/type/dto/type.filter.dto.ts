import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class TypeFilterDto {

    @IsNumber()
    @IsOptional()
    minPrice: number

    @IsNumber()
    @IsOptional()
    maxPrice: number

    
    @IsUUID()
    @IsOptional()
    category: string

}