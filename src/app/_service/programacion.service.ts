import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgramacionMatricula } from '../_model/programacionMatricula';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService extends GenericService<ProgramacionMatricula>{


  programacionCambio = new Subject<ProgramacionMatricula[]>();
  mensajeCambio = new Subject<string>();

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/programacion/matriculas`);
   }
}
