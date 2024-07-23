import {
    IsEmail,
    IsStrongPassword,
    IsNotEmpty,
    MaxLength,
    IsString,
    MinLength,
    IsDateString,
    IsUUID,
  } from 'class-validator';
  
  export class SignupDto {

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    @MaxLength(255)
    password: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(1000)
    adress: string
    
    // role:string

    // token: string

 

  }
  