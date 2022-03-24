import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Parentesco } from 'src/app/_model/parentesto';
import * as moment from 'moment';
import{ Globales } from '../../../_model/globales';
import Swal from 'sweetalert2';
import { ProgramacionService } from 'src/app/_service/programacion.service';
import { Nivel } from 'src/app/_model/nivel';
import { Grado } from 'src/app/_model/grado';
import { Seccion } from 'src/app/_model/seccion';
import { Estado } from 'src/app/_model/estado';
import { ProgramacionMatricula } from '../../../_model/programacionMatricula';

@Component({
  selector: 'app-programacion-dialogo',
  templateUrl: './programacion-dialogo.component.html',
  styleUrls: ['./programacion-dialogo.component.css']
})
export class ProgramacionDialogoComponent implements OnInit {

  validacion = {nombre_text: false,nombre_count:false, 
              apellido_text: false,apellido_count:false, 
              dni_text: false,dni_count:false};
  programacion!: ProgramacionMatricula;
  parentesto!:Parentesco[];
  nivel!:Nivel[];
  grado!:Grado[];
  seccion!:Seccion[];
  estado!:Estado[];
  idParentescoSeleccionado!:number;
  idNivelSeleccionado!:number;
  idGradoSeleccionado!:number;
  idSeccionSeleccionado!:number;
  idEstadoSeleccionado!:number;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private programacionService :ProgramacionService,
    private dialogRef: MatDialogRef<ProgramacionDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ProgramacionMatricula
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.programacion = new ProgramacionMatricula();
    this.programacion.idProgMatricula= this.data.idProgMatricula;
    this.programacion.codigoMatricula= this.data.codigoMatricula;
    this.programacion.descripcion= this.data.descripcion;
    this.programacion.cantidadCuposTotal= this.data.cantidadCuposTotal;
    this.programacion.cantidadCuposRegistrados= this.data.cantidadCuposRegistrados;
    this.programacion.year= this.data.year;
    this.programacion.grado= this.data.grado;
    this.programacion.seccion= this.data.seccion;
    this.programacion.nivel= this.data.nivel;
    this.programacion.montoMatricula= this.data.montoMatricula;
    this.programacion.montoMensualidad= this.data.montoMensualidad;
    //let idParentescoSeleccionado =this.data.tipo;
    //Cargar Parentesco
   // this.listarParentesco();
    this.idNivelSeleccionado =this.data.nivel;
    this.idGradoSeleccionado =this.data.grado;
    this.idSeccionSeleccionado =this.data.seccion;
    this.idEstadoSeleccionado =this.data.estado;
    this.listarNivel();
    this.listarGrado();
    this.listarSeccion();
    this.listarEstado();
  }
  operar(){
    if(this.programacion != null && this.programacion.idProgMatricula > 0){

      var fecha = moment(this.fechaSeleccionada);
      console.log(this.fechaSeleccionada);
      console.log(fecha);
      this.programacion.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
      this.programacion.nivel = this.idNivelSeleccionado;
      this.programacion.grado = this.idGradoSeleccionado;
      this.programacion.seccion = this.idSeccionSeleccionado;
      this.programacion.estado = this.idEstadoSeleccionado;
      this.programacionService.modificar(this.programacion).pipe(switchMap( () => {
        return this.programacionService.listar();
      })).subscribe(data => {
        this.programacionService.programacionCambio.next(data);
        //this.programacionService.mensajeCambio.next('SE MODIFICO');
      });
      Swal.fire('Modifcar Programacion', 'Modificación Exitoso!', 'success')
      this.dialogRef.close();
    }else{
      //REGISTRAR
      //this.validarCampos();
      if( typeof this.programacion.codigoMatricula === "undefined" ||
          typeof this.programacion.cantidadCuposTotal === "undefined"||
          typeof this.programacion.montoMatricula === "undefined"||
          typeof this.programacion.montoMensualidad === "undefined"){
          Swal.fire('Registrar Programacion', 'Falta llenar campos Obligatorios!', 'warning')
      }else{
          console.log(this.validacion.apellido_count);
          if (this.validacion.nombre_count ||
              this.validacion.nombre_text ||
              this.validacion.apellido_count ||
              this.validacion.apellido_text ||
              this.validacion.dni_count ||
              this.validacion.dni_text){
              Swal.fire('Registrar Programacion', 'Falta llenar campos Obligatorios!', 'warning')
          }else{
 
              this.programacion.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
              this.programacion.nivel = this.idNivelSeleccionado;
              this.programacion.grado = this.idGradoSeleccionado;
              this.programacion.seccion = this.idSeccionSeleccionado;
              this.programacion.estado = this.idEstadoSeleccionado;
              this.programacion.cantidadCuposRegistrados = 0;
              console.log(this.programacion)
              this.programacionService.registrar(this.programacion).pipe(switchMap( () => {
                return this.programacionService.listar();
              })).subscribe(data => {
                this.programacionService.programacionCambio.next(data);
                //this.programacionService.mensajeCambio.next('SE REGISTRO');
              });
              Swal.fire('Registrar Programación', 'Registro Exitoso!', 'success')
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
  listarParentesco(){
    
  this.parentesto = Globales.listaParentesto;
 }
 listarNivel(){
    
  this.nivel = Globales.listaNivel;
 }
 listarGrado(){
    
  this.grado = Globales.listaGrado;
 }
 listarSeccion(){
    
  this.seccion = Globales.listaSeccion;
 }
 listarEstado(){
    
  this.estado = Globales.listaEstadoProgramacion;
 }
 validarSeleccion(id: number){

  console.log(id);

 }
 validarCampos(){}
 /*
 validarCampos(){
  console.log(this.programacion.nombre);
  if (this.programacion.nombre != null){
    if (this.programacion.nombre.length== 0 ){
        this.validacion.nombre_text= true;
        this.validacion.nombre_count= false;
        console.log("a");
    }else{
      if (this.programacion.nombre.length<=3 ){
      this.validacion.nombre_count= true;
      this.validacion.nombre_text= false;
      console.log("b");
     }
     else{
      this.validacion.nombre_count= false;
      this.validacion.nombre_text= false;
     }
  }
}
console.log(this.programacion.apellidos);
if (this.programacion.apellidos != null){
    if (this.programacion.apellidos.length== 0 ){
        this.validacion.apellido_text= true;
        this.validacion.apellido_count= false;
    }else{
      console.log(this.programacion.apellidos.length);
      if (this.programacion.apellidos.length<= 3 ){
          this.validacion.apellido_count= true;
          this.validacion.apellido_text= false;
     }
     else{
          this.validacion.apellido_count= false;
          this.validacion.apellido_text= false;
     }
   }
  }

  console.log(this.programacion.dni);
if (this.programacion.dni != null){
    if (this.programacion.dni.length== 0 ){
        this.validacion.dni_text= true;
        this.validacion.dni_count= false;
    }else{
      console.log(this.programacion.dni.length);
      if (this.programacion.dni.length < 8 ){
      this.validacion.dni_count= true;
      this.validacion.dni_text= false;
     }
     else{
      this.validacion.dni_count= false;
      this.validacion.dni_text= false;
     }
   }
  }
 }*/
}



