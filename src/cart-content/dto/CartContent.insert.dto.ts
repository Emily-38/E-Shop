import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"
import { StockInsertDto } from "src/stock/dto/stock.insert.dto"

export class CartContentDto {

    @IsNumber()
    @IsNotEmpty()
    quantity:number
    @IsString()
    @IsNotEmpty()
    size:string
    @IsUUID()
    @IsNotEmpty()
    productId:string
    
   
}


