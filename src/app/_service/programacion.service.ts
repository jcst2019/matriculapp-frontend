import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Programacion } from '../_model/programacion';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService extends GenericService<Programacion>{


  programacionCambio = new Subject<Programacion[]>();
  mensajeCambio = new Subject<string>();

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/programacion/matriculas`);
   }
}
