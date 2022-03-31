
import { DetalleCronograma } from './detalleCronograma';
import { Matricula } from './matricula';
export class Cronograma{
    
    idCronograma!:number;
    matricula!:Matricula;
    estado!:number;
    fechaCronograma!:string;
    detalleCronograma!:DetalleCronograma[];
}