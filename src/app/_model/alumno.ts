import { Apoderado } from 'src/app/_model/apoderado';
export class Alumno{
    
    idAlumno!: number;
    nombre!:string;
    apellidos!:string;
    genero!:number;
    tipoDocumento!:number;
    numDocumento!:string;
    direccion!:string;
    telefono!:string;
    fechaIngreso!:string;
    fechaNacimiento!:string;
    fechaRegistro!:string;
    fechaModificacion!:string;
    email!:string;
    estado!:number;
    tipoDescuento!:number;
    apoderados!:Apoderado[];

}