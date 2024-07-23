
import { IsEmail, IsNotEmpty,  IsStrongPassword, MaxLength } from 'class-validator';
  export class SigninDto {
    
  
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @MaxLength(255)
    password: string;
  }
