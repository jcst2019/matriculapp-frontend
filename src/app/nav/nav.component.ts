import { Menu } from './../_model/menu';
import { MenuService } from './../_service/menu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


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
  appitems!: Menu[];

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(){
    //Reemplazar por la llamada al service para suscribirse al observable
    this.appitems = this.menuService.getMenu();
    console.log(this.appitems);
  }

  selectedItem(e: any){
    console.log(e);
    this.drawer.toggle();
    this.router.navigate([e.link]);    
  }
}
