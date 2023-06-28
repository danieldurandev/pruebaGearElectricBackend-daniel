import { IsIn, IsString, MinLength, MaxLength, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class CreateAsistenciaDto {

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    names:string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    lastNames:string;

    @IsIn(["C.C", "C.E", "Pasaporte"])
    typeOfDocument:string;

    @IsString()
    @MinLength(7)
    @MaxLength(30)
    idNumber:string
    
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    mobilePhone:string;
    
    @IsEmail()
    email:string;

    @IsOptional()
    @IsBoolean()
    isActive:boolean;
}
