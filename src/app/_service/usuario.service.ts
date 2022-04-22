import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cronograma } from '../_model/cronograma';
import { Matricula } from '../_model/matricula';
import { Respuesta } from '../_model/respuesta';
import { DetalleCronogramaPagoDTO } from '../_model/detalleCronogramaPagoDTO';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = `${environment.HOST}/api/usuarios`

  constructor( private http: HttpClient) { 

  }
  
  listarPorUsername(username: string){
  
    return this.http.get<Usuario>(`${this.url}/listarPorUsername/${username}`);
  }

}
