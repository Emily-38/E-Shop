import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class userUpdateDto {

    @IsString()
    @IsOptional()
    email: string  

    @IsString()
    @IsOptional()
    password:  string

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName:  string

    @IsString()
    @IsOptional()
    adress:string

    @IsBoolean()
    @IsOptional()
isActive: boolean

}