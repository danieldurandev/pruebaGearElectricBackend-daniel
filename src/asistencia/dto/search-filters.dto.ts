import { Type } from "class-transformer";
import { IsIn, IsOptional } from "class-validator";

export class SearchFilters {

    @IsOptional()
    @Type(()=>String)
    names: string = "";

    @IsOptional()
    @Type(()=>String)
    lastNames:string = "";

    @IsOptional()
    @Type(()=>String)
    email:string = "";

    @IsOptional()
    @Type(()=>String)
    typeOfDocument:string = "";

    @IsOptional()
    @Type(()=>String)
    idNumber:string = ""

}