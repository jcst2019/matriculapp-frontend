import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apoderado } from '../_model/apoderado';
import { GenericService } from './generic.service';
import { FiltroApoderadoServiceDTO } from '../dto/filtroApoderadoServiceDTO';
import { Rol } from '../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService extends GenericService<Rol>{

  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/roles`);
   }

  

}
