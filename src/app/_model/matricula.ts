
import { Alumno } from './alumno';
import { ProgramacionMatricula } from './programacionMatricula';
export class Matricula{
    
    idMatricula!:number;
    alumno!:Alumno;
    programacionMatricula!:ProgramacionMatricula;
    fechaMatricula!:string;
    estado!:number;


}