import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Matricula } from '../_model/matricula';
import { GenericService } from './generic.service';
import { Pago } from '../_model/pago';
import { ConsultaResumenPagoDTO } from '../_model/consultaResumenPagoDTO';

@Injectable({
  providedIn: 'root'
})
export class PagoService   extends GenericService<Pago>{


  pagoCambio = new Subject<Pago[]>();
  mensajeCambio = new Subject<string>();

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/pagos`);
   }

   generarConstanciaMatricula(id: number){
    return this.http.get(`${this.url}/generarConstanciaMatricula/${id}`, {
      responseType: 'blob'
    });
  }

  listarResumenPagos(){
    return this.http.get<ConsultaResumenPagoDTO[]>(`${this.url}/listarResumenPagos`);
  }

  generarConstanciaPago(id: number){
    return this.http.get(`${this.url}/generarConstanciaPago/${id}`, {
      responseType: 'blob'
    });
  }

}