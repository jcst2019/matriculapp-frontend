import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Matricula } from '../_model/matricula';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService  extends GenericService<Matricula>{


  matriculaCambio = new Subject<Matricula[]>();
  mensajeCambio = new Subject<string>();

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/matriculas`);
   }
}