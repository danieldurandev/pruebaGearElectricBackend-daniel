import { IsIn, IsString, MinLength, MaxLength, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class CreateAsistenciaDto {

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    names:string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    last_names:string;

    @IsIn(["C.C", "C.E", "Pasaporte"])
    type_of_document:string;

    @IsString()
    @MinLength(7)
    @MaxLength(30)
    id_number:string
    
    @IsString()
    @MinLength(7)
    @MaxLength(10)
    mobile_phone:string;
    
    @IsEmail()
    email:string;

    @IsOptional()
    @IsBoolean()
    is_active:boolean;
}
