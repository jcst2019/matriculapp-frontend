import { Apoderado } from 'src/app/_model/apoderado';
export class FiltroApoderadoServiceDTO{
    
    idApoderado!: number;
    nombre!:string;
    apellidos!:string;
    numDocumento!:string;
    fechaNacimiento!:Date;
    fechaRegsitro!:Date;

}