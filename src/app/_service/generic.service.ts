import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http: HttpClient,
    @Inject(String) protected url: string
  ) { }

  listar(){

    return this.http.get<T[]>(`${this.url}/listar`);
  }

  listarPorId(id: number){
    return this.http.get<T>(`${this.url}/listar/${id}`);
  }

  registrar(t : T){

    return this.http.post(`${this.url}/registrar`,t);
  }

  modificar(t : T){
  
    return this.http.put(`${this.url}/modificar`,t);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
