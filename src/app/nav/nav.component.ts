import { Menu } from './../_model/menu';
import { MenuService } from './../_service/menu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuBD } from '../_model/menuBD';
import { SubMenuService } from '../_service/submenu.service';
import { SubMenu } from '../_model/submenu';
import { LoginService } from '../_service/login.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  /*config = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: 'rgb(208, 241, 239)',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: 'rgb(208, 241, 239)',
    selectedListFontColor: 'red',
  };*/

  @ViewChild('drawer') drawer!: MatSidenav;
  menuTemporal:Array<Menu>=[];
  subMenusTemporal:Array<SubMenu>=[];
  appitems: Menu[] = [];
  subMenus: SubMenu[] = []; 
  menusBD:Array<MenuBD>=[];

  nombreUsuario:string ="";

  constructor(private menuService: MenuService, 
              private subMenuService :SubMenuService,
              public loginService:LoginService,//SE coloco público para que se pueda usar directamente en el HTML 
              private router: Router
              ) { 
                console.log('Nombre del Session Storage',sessionStorage.getItem(environment.NAME_USUARIO));
                this.nombreUsuario = sessionStorage.getItem(environment.NAME_USUARIO)!;
              }

  ngOnInit(){
    //Para el BUG de que se pierde el menú cuando se actualiza la página, podría intentar de guardar esta lista en el sesión Storage
    //Reemplazar por la llamada al service para suscribirse al observable
      this.menuService.getMenuCambio().subscribe( data=>{
      this.menusBD = data
      console.log('Data Observable',data);
      console.log('Data MenuBD',this.menusBD);
      for (let item of this.menusBD) {
        let iten:Menu = new Menu();
        iten.icon = item.icono;
        //iten.items = Submenú
        iten.label = item.nombre;
        iten.link = item.url;

        //Trabajar con los Submenus
        
        let listaSubmenu:Array<SubMenu> = [];
        this.subMenuService.listarPorIdMatricula(item.idMenu).subscribe(data => {
          if(data.length>0){
            console.log('Ingresoooo ',data);
            this.subMenus=data;
            this.subMenusTemporal=[];
            for (let itemSubmenu of data) {
                 let itenSubmenu:SubMenu = new SubMenu();
                 itenSubmenu.icon = itemSubmenu.icon;
                 itenSubmenu.label = itemSubmenu.label;
                 itenSubmenu.link = itemSubmenu.link;
                 this.subMenusTemporal.push(itenSubmenu);
            }
            this.subMenus = this.subMenusTemporal;
            iten.items = this.subMenus;
          }
          //console.log('Item Agregado',iten);
          //this.menuTemporal.push(iten);
          //console.log('menuTemporal',this.menuTemporal);
        });
        console.log('Item Agregado',iten);
        this.menuTemporal.push(iten);
        console.log('menuTemporal',this.menuTemporal);
      }
      this.appitems =this.menuTemporal; 
      console.log('APPITEMS',this.appitems);
    });
    /*
    Dentro del Foreach No hay referencia para this. 
    this.menusBD.forEach(function (value) {
        let iten:Menu = new Menu();
        iten.icon = value.icono;
        //iten.items = Submenú
        iten.label = value.nombre;
        iten.link = value.url;
      })*/

    //Esto es cuando es estático y NO leyendo de la BD
    //this.appitems = this.menuService.getMenu();
    console.log('Lista del Antigua',this.menuService.getMenu());
    console.log('Lista del Menu',this.appitems); //No pinta en el console log porque este se ejecuta antes de que se termine de llenar appitems
    //this.appitems = this.menuService.getMenu();
    //console.log('appitems = ',this.appitems)

  }

  selectedItem(e: any){
    console.log(e);
    this.drawer.toggle();
    this.router.navigate([e.link]);    
  }

  cerrarSesion(){

    //this.refreshPage();
    this.loginService.cerrarSesion();
    
  }

  
}
