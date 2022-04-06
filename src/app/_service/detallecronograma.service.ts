import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cronograma } from '../_model/cronograma';
import { Matricula } from '../_model/matricula';
import { Respuesta } from '../_model/respuesta';
import { DetalleCronogramaPagoDTO } from '../_model/detalleCronogramaPagoDTO';

@Injectable({
  providedIn: 'root'
})
export class DetalleCronogramaService {

  url: string = `${environment.HOST}/api/detallecronogramas`

  constructor( private http: HttpClient) { 

  }
  
  registrarMontoPagado(objDTO: DetalleCronogramaPagoDTO){
    return this.http.post(`${this.url}/registrar/montopagado`,objDTO);
  }

}
