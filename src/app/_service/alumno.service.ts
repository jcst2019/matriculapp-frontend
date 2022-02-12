import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Alumno } from './../_model/alumno';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends GenericService<Alumno>{

  alumnoCambio = new Subject<Alumno[]>();
  mensajeCambio = new Subject<string>();

  //url: string = `${environment.HOST}/api/alumnos`
  constructor( http: HttpClient) { 
    super(
      http,`${environment.HOST}/api/alumnos`
    );
  } 
  
  /*
  listar(){

    return this.http.get<Alumno[]>(`${this.url}/listar`);

  }

  listarPorId(id :number){

    return this.http.get<Alumno>(`${this.url}/listar/${id}`);

  }

  registrar(alumno :Alumno){

    return this.http.post(`${this.url}/registrar`,alumno);

  }
  
  modificar(alumno :Alumno){

    return this.http.put(`${this.url}/modificar`,alumno);

  }

  
  eliminar(id :number){

    return this.http.delete(`${this.url}/eliminar/${id}`);

  }*/
}
