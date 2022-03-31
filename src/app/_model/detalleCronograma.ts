
import { Alumno } from './alumno';
import { Matricula } from './matricula';
import { Cronograma } from './cronograma';
export class DetalleCronograma{
    
    idDetalleCronograma!:number;
    cronograma!:Cronograma;
    periodo!:string;
    montoSistema!:number;
    montoDescuento!:number;
    montoPagar!:number;
    montoPagado!:number;
    estado!:number;
    fechaRegistro!:string;
    fechaModificacion!:string;
}