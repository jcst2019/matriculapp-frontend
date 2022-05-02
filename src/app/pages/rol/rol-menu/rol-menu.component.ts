import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Parentesco } from 'src/app/_model/parentesto';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { TipoDocuemnto } from '../../../_model/tipoDocumento';
import { Rol } from '../../../_model/rol';
import { RolService } from '../../../_service/rol.service';
import { RolDialogoComponent } from '../rol-dialogo/rol-dialogo.component';
import { MenuService } from 'src/app/_service/menu.service';
import { Menu } from 'src/app/_model/menu';
import { MenuBD } from 'src/app/_model/menuBD';

@Component({
  selector: 'app-rol-menu',
  templateUrl: './rol-menu.component.html',
  styleUrls: ['./rol-menu.component.css']
})
export class RolMenuComponent implements OnInit {

  tituloVentana: string ='ASIGNAR MENÚ';
  rolRecibido :Rol = new Rol();
  listaMenu!:Array<MenuBD>;
  listaMenuActualizada!:Array<MenuBD>;
  listaMenuPorRol!:Array<MenuBD>;
  listaMenu2!:Array<Menu>;
  lastAction!: string;

  constructor(
    private menuService: MenuService,
    private dialogRef: MatDialogRef<RolDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Rol
  ) { }

  ngOnInit(): void {

    console.log(this.data);
    this.rolRecibido = this.data

    this.menuService.listarAll().subscribe(data => {
      console.log("DATA Menu BD",data);
      this.listaMenu = data;
      //this.listaMenu[0].value=true;
      //this.listaMenu[4].value=true;
      console.log("DATA2 Menu BD",this.listaMenu);
      this.menuService.listarPorRol( this.rolRecibido.idRol).subscribe(data => {
           this.listaMenuPorRol = data;
           console.log("DATA Menú por Rol",this.listaMenuPorRol);
           //Desde la BD llegan varios roles para la lista de menú, porque una opción de Menu puede estar asociado a varios ROLEs en la tabla menu_rol
           for(var i = 0; i < this.listaMenu.length; i++){
            this.listaMenu[i].roles = []; //Limpiamos los Roles que vienen de la BD 
             const rol :Rol = new Rol();
             rol.idRol = this.rolRecibido.idRol;    
             this.listaMenu[i].roles.push(rol);//Asignamos 1 solo ROL
           }
           /* Desde el forEach no puedo acceder a this
           this.listaMenu.forEach(function(obj){
                 obj.roles = [];
          }); //Quitamos los Roles para asignarle un solo Rol
          */
          console.log("DATA Menú por Rol (Roles Vacios)",this.listaMenuPorRol);
           for(var i = 0; i < this.listaMenu.length; i++){
               //console.log("listaMenuPorRol[i]",this.listaMenuPorRol[i]);
              const bandera = this.listaMenuPorRol.filter(lista => lista.idMenu === this.listaMenu[i].idMenu);
              console.log("bandera",bandera);
              if (bandera === undefined || bandera === null || bandera.length === 0){
                this.listaMenu[i].value = false;
              }else{
                this.listaMenu[i].value= true;
              }
           }
           this.listaMenuActualizada = this.listaMenu;   
           console.log("listaMenuActualizada Antes",this.listaMenuActualizada);
          }); 
      });
  }
  
  cancelar(){
    this.dialogRef.close();

  }

 validarSeleccion(id: number){

  console.log(id);

 }
 operar(){
  //Primero Borramos los resgistros de la tabla menu_rol por id_rol
  this.menuService.borrarMenuPorRol(this.rolRecibido.idRol).subscribe(data => {
    console.log('Borrado',data);
  });
  //Segudo Insertamos el nuevo menú por Rol
  this.menuService.registrarMenuPorRol(this.listaMenuActualizada.filter(data => data.value === true)).subscribe(data => {
    console.log('Isertado',data);
  });
  Swal.fire('Asignar Menu', 'Asiganción Exitosa!', 'success')
  this.dialogRef.close();
 }
 onChange(event: any, index: number, item:MenuBD) {

  console.log('Menu Check',item);
  /*
  if(item.value){
    item.value =  false;
  }else{
    item.value =  true;
  }*/
  item.value = !item.value;
  console.log('Menu Check2',item);
  this.lastAction = 'index: ' + index + ', label: ' + item.nombre + ', checked: ' + item.value;
  console.log(this.lastAction);
  //console.log(index, event, item);
  console.log('this.listaMenuActualizada = ',this.listaMenuActualizada)
  

}
}


