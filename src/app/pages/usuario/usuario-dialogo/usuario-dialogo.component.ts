import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Parentesco } from 'src/app/_model/parentesto';
import * as moment from 'moment';
import{ Globales } from '../../../_model/globales';
import Swal from 'sweetalert2';
import { TipoDocuemnto } from '../../../_model/tipoDocumento';
import { Rol } from '../../../_model/rol';
import { RolService } from '../../../_service/rol.service';
import { RolDialogoComponent } from '../../rol/rol-dialogo/rol-dialogo.component';
import { UsuarioService } from '../../../_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-usuario-dialogo',
  templateUrl: './usuario-dialogo.component.html',
  styleUrls: ['./usuario-dialogo.component.css']
})
export class UsuarioDialogoComponent implements OnInit {

  validacion = {username_text: false,username_count:false};
  rolSeleccionado!: Array<Rol>;
  usuario: Usuario = new Usuario();
  listaRoles!:Rol[];
  tituloVentana: string ='';
  parentesto!:Parentesco[];
  idParentescoSeleccionado!:number;
  idRolSeleccionado!:number;
  idTipoDocumentoSeleccionado!:number;
  tipoDocumento!:TipoDocuemnto[];
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private rolService :RolService,
    private usuarioService :UsuarioService,
    private dialogRef: MatDialogRef<RolDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Usuario
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.idUsuario>0){
      this.tituloVentana = "MODIFICAR USUARIO";
      this.idRolSeleccionado= this.data.roles[0].idRol;//Solo se acepta 1 solo Rol por Usuario
    }else{
      this.tituloVentana = "REGISTRAR USUARIO";
    }
    this.usuario.idUsuario= this.data.idUsuario;
    this.usuario.username= this.data.username;
    this.usuario.password= this.data.password;
    this.usuario.enabled= 'true';
    this.usuario.nombre= this.data.nombre;
    this.usuario.apellidos= this.data.apellidos;
    this.usuario.tipoDocumento = this.data.tipoDocumento;
    this.idTipoDocumentoSeleccionado= this.data.tipoDocumento;
    this.usuario.numDocumento= this.data.numDocumento;
    this.usuario.fechaRegistro= this.data.fechaRegistro;
    this.usuario.roles= this.data.roles;
    this.listarTipoDocumento();
    this.rolService.listar().subscribe(data =>{
      console.log(data);
      this.listaRoles = data;
      console.log('Lista Roles',this.listaRoles);
    });

  }
  operar(){
    if(this.usuario != null && this.usuario.idUsuario > 0){

      //MODIFICAR
      //this.usuario.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
      console.log("Modificar Usuario",this.usuario)
      this.usuarioService.modificar(this.usuario).pipe(switchMap( () => {
            return this.usuarioService.listar();
      })).subscribe(data => {
              this.usuarioService.UsuarioCambio.next(data);
                  //this.rolService.mensajeCambio.next('SE MODIFICO');
      });
      Swal.fire('Modifcar Usuario', 'Modificación Exitoso!', 'success')
      this.dialogRef.close();
    }else{
      //REGISTRAR
      this.validarCampos();
      if( typeof this.usuario.username === "undefined" ){
          Swal.fire('Registrar Usuario', 'Falta llenar campos Obligatorios!', 'warning')
      }else{
          if (this.validacion.username_text ){
              Swal.fire('Registrar Usuario', 'Falta llenar campos Obligatorios!', 'warning')
          }else{
               if(this.rolSeleccionado=== undefined){
                Swal.fire('Registrar Usuario', 'Falta llenar el Rol de Usuario!', 'warning')
               }
               else{
                    console.log("Registrar Usuario",this.usuario)
                    this.usuario.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
                    this.usuario.password="123456";
                    this.usuario.tipoDocumento=this.idTipoDocumentoSeleccionado;
                    console.log("this.rolSeleccionado",this.rolSeleccionado)
                    this.usuario.roles=this.rolSeleccionado;
                    //this.usuario.roles[0].idRol = this.idRolSeleccionado;
                    console.log("Registrar Usuario2",this.usuario)
                    this.usuarioService.registrar(this.usuario).pipe(switchMap( () => {
                            return this.usuarioService.listar();
                    })).subscribe(data => {
                            this.usuarioService.UsuarioCambio.next(data);
                            //this.rolService.mensajeCambio.next('SE REGISTRO');
                    });
                    Swal.fire('Registrar Usuario', 'Registro Exitoso!', 'success')
                    this.dialogRef.close();      
               }    
            }
          }
    }
    //this.dialogRef.close();

  }
  cancelar(){
    this.dialogRef.close();

  }
  cambieFecha(e: any) {
    console.log(e);
  }

 validarSeleccion(id: number){

  console.log(id);

 }
 asignarRolSelecionado(id: number){

  console.log(id);

   let rol:Rol[];
   rol= this.listaRoles.filter( data => data.idRol === id);
   this.rolSeleccionado=rol; //Solo es un Rol por usuario
 }

 listarTipoDocumento(){
    
  this.tipoDocumento = Globales.listaTipoDocumento;

}

 validarCampos(){
  console.log(this.usuario.username);
  if (this.usuario.username != null){
    if (this.usuario.username.length== 0 ){
        this.validacion.username_text= true;
        this.validacion.username_count= false;
        console.log("a");
    }else{
      if (this.usuario.username.length<2 ){
      this.validacion.username_count= true;
      this.validacion.username_text= false;
      console.log("b");
     }
     else{
      this.validacion.username_count= false;
      this.validacion.username_text= false;
     }
  }
}
 }
}



