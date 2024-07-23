import { IsString, MaxLength, MinLength } from "class-validator";

export class CategoryDto {

    @IsString()
    @MaxLength(255)
    @MinLength(3)
    name: string

}
