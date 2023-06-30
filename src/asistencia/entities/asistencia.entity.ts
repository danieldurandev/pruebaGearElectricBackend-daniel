import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"assistance"})
export class Asistencia {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column("text")
    names:string;

    @Column("text")
    last_names:string;

    @Column("text", {default: "C.C"})
    type_of_document:string;

    @Column("text", {unique: true})
    id_number:string
    
    @Column("text", {unique: true})
    mobile_phone:string;
    
    @Column("text", {unique: true})
    email:string;

    @Column("bool", {default: true})
    is_active:boolean;
}
