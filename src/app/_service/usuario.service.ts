import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cronograma } from '../_model/cronograma';
import { Matricula } from '../_model/matricula';
import { Respuesta } from '../_model/respuesta';
import { DetalleCronogramaPagoDTO } from '../_model/detalleCronogramaPagoDTO';
import { Usuario } from '../_model/usuario';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario> {

  UsuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();
  //url: string = `${environment.HOST}/api/usuarios`

  constructor(  http: HttpClient) { 

    super(http,`${environment.HOST}/api/usuarios`);
  }
  
  listarPorUsername(username: string){
  
    return this.http.get<Usuario>(`${this.url}/listarPorUsername/${username}`);
  }

}
