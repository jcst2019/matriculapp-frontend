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

@Component({
  selector: 'app-rol-dialogo',
  templateUrl: './rol-dialogo.component.html',
  styleUrls: ['./rol-dialogo.component.css']
})
export class RolDialogoComponent implements OnInit {

  validacion = {rol_text: false,rol_count:false,
                descripcion_text:false,descripcion_count:false};
  rol!: Rol;
  tituloVentana: string ='';
  parentesto!:Parentesco[];
  idParentescoSeleccionado!:number;
  idTipoDocumentoSeleccionado!:number;
  tipoDocumento!:TipoDocuemnto[];
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private rolService :RolService,
    private dialogRef: MatDialogRef<RolDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Rol
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.idRol>0){
      this.tituloVentana = "MODIFICAR ROL";
    }else{
      this.tituloVentana = "REGISTRAR ROL";
    }
    this.rol = new Rol();
    this.rol.idRol= this.data.idRol;
    this.rol.rol= this.data.rol;
    this.rol.descripcion= this.data.descripcion;
    this.rol.estado= this.data.estado;
    this.rol.fechaRegistro= this.data.fechaRegistro;


  }
  operar(){
    if(this.rol != null && this.rol.idRol > 0){

      //MODIFICAR
      this.rol.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
      this.rol.estado = 1;
      this.rolService.modificar(this.rol).pipe(switchMap( () => {
            return this.rolService.listar();
      })).subscribe(data => {
              this.rolService.rolCambio.next(data);
                  //this.rolService.mensajeCambio.next('SE MODIFICO');
      });
      Swal.fire('Modifcar Rol', 'Modificación Exitoso!', 'success')
      this.dialogRef.close();
    }else{
      //REGISTRAR
      this.validarCampos();
      if( typeof this.rol.rol === "undefined" ||
          typeof this.rol.descripcion === "undefined"){
          Swal.fire('Registrar Rol', 'Falta llenar campos Obligatorios!', 'warning')
      }else{
          if (this.validacion.rol_text ||
              this.validacion.descripcion_text){
              Swal.fire('Registrar Apoderado', 'Falta llenar campos Obligatorios!', 'warning')
          }else{

                this.rol.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
                this.rol.estado = 1;
                this.rolService.registrar(this.rol).pipe(switchMap( () => {
                        return this.rolService.listar();
                })).subscribe(data => {
                        this.rolService.rolCambio.next(data);
                        //this.rolService.mensajeCambio.next('SE REGISTRO');
                });
                Swal.fire('Registrar Apoderado', 'Registro Exitoso!', 'success')
                this.dialogRef.close();          
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
 validarCampos(){
  console.log(this.rol.rol);
  if (this.rol.rol != null){
    if (this.rol.rol.length== 0 ){
        this.validacion.rol_text= true;
        this.validacion.rol_count= false;
        console.log("a");
    }else{
      if (this.rol.rol.length<2 ){
      this.validacion.rol_count= true;
      this.validacion.rol_text= false;
      console.log("b");
     }
     else{
      this.validacion.rol_count= false;
      this.validacion.rol_text= false;
     }
  }
}
console.log(this.rol.descripcion);
if (this.rol.descripcion != null){
    if (this.rol.descripcion.length== 0 ){
        this.validacion.descripcion_text= true;
        this.validacion.descripcion_count= false;
    }else{
      console.log(this.rol.descripcion.length);
      if (this.rol.descripcion.length< 2 ){
          this.validacion.descripcion_count= true;
          this.validacion.descripcion_text= false;
     }
     else{
          this.validacion.descripcion_count= false;
          this.validacion.descripcion_text= false;
     }
   }
  }
 }
}


