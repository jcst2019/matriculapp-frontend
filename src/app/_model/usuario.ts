import { Rol } from "./rol";

export class Usuario{
    
    idUsuario!: number;
    username!:string;
    password!:string;
    enabled!:string;
    nombre!:string;
    apellidos!:string;
    tipoDocumento!:number;
    numDocumento!:string;
    roles!:Rol[];
    fechaRegistro!:string;

}