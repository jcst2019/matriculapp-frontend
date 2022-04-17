
import { Cronograma } from './cronograma';
export class Pago{
    
    idPago!:number;
    descripcion!:string;
    indTipoPago!:number;
    cronograma!:Cronograma;
    idDetalleCronograma!:number;
    mtoPago!:number;
    estado!:number;
    fechaPago!:string;
    fechaRegistro!:string;

}