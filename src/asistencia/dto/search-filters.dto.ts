import { Type } from "class-transformer";
import { IsIn, IsOptional } from "class-validator";

export class SearchFilters {

    @IsOptional()
    @Type(()=>String)
    names: string = "";

    @IsOptional()
    @Type(()=>String)
    last_names:string = "";

    @IsOptional()
    @Type(()=>String)
    email:string = "";

    @IsOptional()
    @Type(()=>String)
    type_of_document:string = "";

    @IsOptional()
    @Type(()=>String)
    id_number:string = ""

}