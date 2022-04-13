import { SubMenu } from './../_model/submenu';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService extends GenericService<SubMenu>{
  

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/submenus`);
   }

  ngOnInit(){
        
  }

  listarPorIdMatricula(id: number){
    
    return this.http.get<SubMenu[]>(`${this.url}/listar/menu/${id}`);
  
 }
}
