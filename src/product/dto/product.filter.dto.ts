import { IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

export class ProductFilterDto {

    
    @IsOptional()
    minPrice: number

  
    @IsOptional()
    maxPrice: number

    
    
    @IsOptional()
    category: string

}