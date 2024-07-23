import { IsString, IsUUID } from "class-validator"

export class CartDto {

    
    userId: string 
    
    @IsString()
    statut:    string
   
}
