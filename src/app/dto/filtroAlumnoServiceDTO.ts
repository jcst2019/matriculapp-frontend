import { Apoderado } from 'src/app/_model/apoderado';
export class FiltroAlumnoServiceDTO{
    
    idAlumno!: number;
    nombre!:string;
    apellidos!:string;
    numDocumento!:string;
    fechaNacimiento!:Date;
    fechaIngreso!:Date;
    tipoDescuento!:number;

}