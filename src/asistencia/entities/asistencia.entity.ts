import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"assistance"})
export class Asistencia {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column("text")
    names:string;

    @Column("text")
    lastNames:string;

    @Column("text", {default: "C.C"})
    typeOfDocument:string;

    @Column("text", {unique: true})
    idNumber:string
    
    @Column("text", {unique: true})
    mobilePhone:string;
    
    @Column("text", {unique: true})
    email:string;

    @Column("bool", {default: true})
    isActive:boolean;
}
