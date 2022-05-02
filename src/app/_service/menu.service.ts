import { SubMenu } from './../_model/submenu';
import { Menu } from './../_model/menu';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { MenuBD } from '../_model/menuBD';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu>{
  
  private menuCambio = new Subject<MenuBD[]>();//Usa Programación Reactiva

  constructor( http: HttpClient) {
    super(http,`${environment.HOST}/api/menus`);
   }

  ngOnInit(){
        
  }

  getMenuCambio(){
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus : MenuBD[]){
    console.log('setMenuCambio OK',menus)
    this.menuCambio.next(menus);
    console.log(this.menuCambio);
  }

  listarAll(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.get<MenuBD[]>(`${this.url}/listar`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<MenuBD[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorRol(idRol: number){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<MenuBD[]>(`${this.url}/roles`, idRol, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  borrarMenuPorRol(idRol: number){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<MenuBD[]>(`${this.url}/borrarMenuPorRol`, idRol, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  registrarMenuPorRol(listaMenu: MenuBD[]){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<MenuBD[]>(`${this.url}/registrarMenuPorRol`, listaMenu, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getMenu(){
    //Reemplazar por la llamada a un servicio para retornar Observable
    let m = new Menu();
    let menus: Menu[] = [];
    let submenus: SubMenu[] = []; 
    let sm = new SubMenu();

    m.label = "Administración";
    m.icon = "home";


    sm.icon = "account_circle";
    sm.label = "Usuarios";
    sm.link = "/buscar"
    submenus.push(sm);    

    sm = new SubMenu();
    sm.icon = "menu";
    sm.label = "Menu";
    sm.link = "/registrar"
    submenus.push(sm);
    
    sm = new SubMenu();
  //sm.icon = "work_outline";
    sm.icon = "ballot";
    sm.label = "Rol";
    sm.link = "/registrar"
    submenus.push(sm);  

    m.items = submenus;
    menus.push(m); 

    m = new Menu();

    m.label = "Alumnos";
    m.icon = "contacts";
    m.link = "/alumno";    
    menus.push(m);

    m = new Menu();
    m.label = "Apoderado";
    m.icon = "group_add";
    m.link = "/apoderado";    
    menus.push(m);

    m = new Menu();
    m.label = "Académico";
    m.icon = "brightness_auto";

    submenus = []; // Limpiamos los valores del submenú anterior
    
    sm = new SubMenu();
    sm.icon = "calendar_today";
    sm.label = "Programación";
    sm.link = "/programacion"
    submenus.push(sm);  

    sm = new SubMenu();
    sm.icon = "view_stream";
    sm.label = "Nivel";
    sm.link = "/buscar"
    submenus.push(sm);    

    sm = new SubMenu();
    sm.icon = "view_week";
    sm.label = "Grado";
    sm.link = "/registrar"
    submenus.push(sm);
    
    sm = new SubMenu();
    sm.icon = "view_module";
    sm.label = "Sección";
    sm.link = "/registrar"
    submenus.push(sm); 

    m.items = submenus;
    menus.push(m);   

    m = new Menu();
    m.label = "Matrícula";
    m.icon = "assignment";
    m.link = "/matricula";    
    menus.push(m);

    m = new Menu();
    m.label = "Pagos";
    m.icon = "payment";
    m.link = "/pago";    
    menus.push(m);

    m = new Menu();
    m.label = "Consulta";
    m.icon = "search";

    submenus = []; // Limpiamos los valores del submenú anterior

    sm = new SubMenu();
    sm.icon = "search";
    sm.label = "Buscar";
    sm.link = "/buscar"
    submenus.push(sm);    

    sm = new SubMenu();
    sm.icon = "work_outline";
    sm.label = "Registrar";
    sm.link = "/registrar"
    submenus.push(sm);    

    m.items = submenus;
    menus.push(m);
    
    m = new Menu();
    m.label = "Reportes";
    m.icon = "equalizer";

    submenus = []; // Limpiamos los valores del submenú anterior

    sm = new SubMenu();
    sm.icon = "search";
    sm.label = "Buscar";
    sm.link = "/buscar"
    submenus.push(sm);    

    sm = new SubMenu();
    sm.icon = "work_outline";
    sm.label = "Registrar";
    sm.link = "/registrar"
    submenus.push(sm);    

    m.items = submenus;
    menus.push(m);   
    
    return menus;
  }


}
