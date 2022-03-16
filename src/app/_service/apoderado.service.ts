import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apoderado } from '../_model/apoderado';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService extends GenericService<Apoderado>{

  apoderadoCambio = new Subject<Apoderado[]>();
  mensajeCambio = new Subject<string>();

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/apoderados`);
   }
  
  /*
  listar(){

    return this.http.get<Apoderado[]>(`${this.url}/listar`);

  }

  listarPorId(id :number){

    return this.http.get<Apoderado>(`${this.url}/listar/${id}`);

  }

  registrar(apoderado :Apoderado){

    return this.http.post(`${this.url}/registrar`,apoderado);

  }
  
  modificar(apoderado :Apoderado){

    return this.http.put(`${this.url}/modificar`,apoderado);

  }

  
  eliminar(id :number){

    return this.http.delete(`${this.url}/eliminar/${id}`);

  }*/
}
