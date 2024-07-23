import { IsString, MaxLength, MinLength } from "class-validator";

export class TypeDto {

    @IsString()
    @MaxLength(255)
    @MinLength(3)
    name: string

}
