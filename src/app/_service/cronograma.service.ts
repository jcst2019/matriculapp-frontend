import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cronograma } from '../_model/cronograma';
import { Matricula } from '../_model/matricula';
import { Respuesta } from '../_model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  url: string = `${environment.HOST}/api/cronogramas`

  constructor( private http: HttpClient) { 

  } 

  obtenerDescuento(matricula :Matricula){

    console.log("Recibiendo :", matricula);
    return this.http.post<Respuesta>(`${this.url}/getdescuentos`, matricula);

  }

  obtenerCronogramaPorMatricula(id: number){

    console.log("Recibiendo ID Matricula :", id);
    return this.http.get<Cronograma>(`${this.url}/listardetalle/matricula/${id}`);

  }

  obtenerCronogramaPorAlumno(id: number){

    console.log("Recibiendo ID Alumno :", id);
    return this.http.get<Cronograma[]>(`${this.url}/listardetalle/alumno/${id}`);

  }

}
