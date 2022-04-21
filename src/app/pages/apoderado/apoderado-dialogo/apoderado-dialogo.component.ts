import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Parentesco } from 'src/app/_model/parentesto';
import { Apoderado } from '../../../_model/apoderado';
import { ApoderadoService } from '../../../_service/apoderado.service';
import * as moment from 'moment';
import{ Globales } from '../../../_model/globales';
import Swal from 'sweetalert2';
import { TipoDocuemnto } from '../../../_model/tipoDocumento';

@Component({
  selector: 'app-apoderado-dialogo',
  templateUrl: './apoderado-dialogo.component.html',
  styleUrls: ['./apoderado-dialogo.component.css']
})
export class ApoderadoDialogoComponent implements OnInit {

  validacion = {nombre_text: false,nombre_count:false, 
              apellido_text: false,apellido_count:false, 
              dni_text: false,dni_count:false};
  apoderado!: Apoderado;
  tituloVentana: string ='';
  parentesto!:Parentesco[];
  idParentescoSeleccionado!:number;
  idTipoDocumentoSeleccionado!:number;
  tipoDocumento!:TipoDocuemnto[];
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private apoderadoService :ApoderadoService,
    private dialogRef: MatDialogRef<ApoderadoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Apoderado
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.idApoderado>0){
      this.tituloVentana = "MODIFICAR APODERADO";
    }else{
      this.tituloVentana = "REGISTRAR APODERADO";
    }
    this.apoderado = new Apoderado();
    this.apoderado.idApoderado= this.data.idApoderado;
    this.apoderado.nombre= this.data.nombre;
    this.apoderado.apellidos= this.data.apellidos;
    this.apoderado.tipoDocumento= this.data.tipoDocumento;
    this.apoderado.numDocumento= this.data.numDocumento;
    this.apoderado.telefono= this.data.telefono;
    this.apoderado.direccion= this.data.direccion;
    this.apoderado.email= this.data.email;
    //let idParentescoSeleccionado =this.data.tipo;
    //Cargar Parentesco
   // this.listarParentesco();
    this.idParentescoSeleccionado =this.data.tipo;
    this.listarParentesco();
    this.listarTipoDocumento();
    this.fechaSeleccionada = new Date(this.data.fechaNacimiento);
  }
  operar(){
    if(this.apoderado != null && this.apoderado.idApoderado > 0){

      //MODIFICAR
       //ISO Date
       console.log(this.data.fechaNacimiento);
       console.log(this.fechaSeleccionada);
       //Instalar Moment JS y probar que se registre la fecha correctamente
      //let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
      //let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
      
       //Validar Si la fecha de Nacimeinto es mayor a 18 años
       if (!isNaN(this.fechaSeleccionada.getTime())){ //Validar si ha llenado el DatePicker de Fecha de Ingreso 
          var fechaAuxiliar = moment(this.fechaSeleccionada).add(18, 'y');
          console.log('Fecha Nacimiento Sumada 18 años', fechaAuxiliar);
          console.log('Fecha Nacimiento Sumada 18 años(DATE)',  moment(fechaAuxiliar, "DD-MM-YYYY").toDate());
          console.log('Fecha Actual', moment().toDate());
          if ( moment(fechaAuxiliar).isAfter( moment())){
               console.log('Ingreso');
               var fechaMinima =  moment().add(-18, 'y')
               console.log('Fecha Mínima', fechaMinima)
               var textoMensaje ='La Fecha de Nacimiento es errada. <br> Fecha mínima de Nacimiento '+ moment(fechaMinima).format('DD-MM-YYYY');
               Swal.fire('Modificar Apoderado', textoMensaje, 'warning')
          }else{
                console.log('NO Ingreso');
                this.apoderado.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
                var fecha = moment(this.fechaSeleccionada);
                console.log(this.fechaSeleccionada);
                console.log(fecha);

                this.apoderado.fechaModificacion= moment().format('YYYY-MM-DDTHH:mm:ss');
                console.log(this.apoderado.fechaNacimiento);
                console.log(this.apoderado.fechaModificacion);
                this.apoderado.tipo = this.idParentescoSeleccionado;
                this.apoderado.tipoDocumento = this.idTipoDocumentoSeleccionado;
                this.apoderado.estado = 1;
                this.apoderadoService.modificar(this.apoderado).pipe(switchMap( () => {
                  return this.apoderadoService.listar();
                })).subscribe(data => {
                  this.apoderadoService.apoderadoCambio.next(data);
                  //this.apoderadoService.mensajeCambio.next('SE MODIFICO');
                });
                Swal.fire('Modifcar Apoderado', 'Modificación Exitoso!', 'success')
                this.dialogRef.close();
          }
       }else{
        Swal.fire('Modifcar Apoderado', 'Por favor Ingresar la Fecha de Nacimeinto', 'warning')
     } 
      
    }else{
      //REGISTRAR
      this.validarCampos();
      if( typeof this.apoderado.nombre === "undefined" ||
          typeof this.apoderado.apellidos === "undefined"||
          typeof this.apoderado.numDocumento === "undefined"){
          Swal.fire('Registrar Apoderado', 'Falta llenar campos Obligatorios!', 'warning')
      }else{
          console.log(this.validacion.apellido_count);
          if (this.validacion.nombre_count ||
              this.validacion.nombre_text ||
              this.validacion.apellido_count ||
              this.validacion.apellido_text ||
              this.validacion.dni_count ||
              this.validacion.dni_text){
              Swal.fire('Registrar Apoderado', 'Falta llenar campos Obligatorios!', 'warning')
          }else{
              //Validar Si la fecha de Nacimeinto es mayor a 18 años
              if (!isNaN(this.fechaSeleccionada.getTime())){ //Validar si ha llenado el DatePicker de Fecha de Ingreso
                  var fechaAuxiliar = moment(this.fechaSeleccionada).add(18, 'y');
                  console.log('Fecha Nacimiento Sumada 18 años', fechaAuxiliar);
                  console.log('Fecha Nacimiento Sumada 18 años(DATE)',  moment(fechaAuxiliar, "DD-MM-YYYY").toDate());
                  console.log('Fecha Actual', moment().toDate());
                  if ( moment(fechaAuxiliar).isAfter( moment())){
                      console.log('Ingreso');
                      var fechaMinima =  moment().add(-18, 'y')
                      console.log('Fecha Mínima', fechaMinima)
                      var textoMensaje ='La Fecha de Nacimiento es errada. <br> Fecha mínima de Nacimiento '+ moment(fechaMinima).format('DD-MM-YYYY');
                      Swal.fire('Registrar Apoderado', textoMensaje, 'warning')
                  }else{
                      this.apoderado.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss'); 
                      this.apoderado.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
                      this.apoderado.tipo = this.idParentescoSeleccionado;
                      this.apoderado.tipoDocumento = this.idTipoDocumentoSeleccionado;
                      this.apoderado.estado = 1;
                      this.apoderadoService.registrar(this.apoderado).pipe(switchMap( () => {
                        return this.apoderadoService.listar();
                      })).subscribe(data => {
                        this.apoderadoService.apoderadoCambio.next(data);
                        //this.apoderadoService.mensajeCambio.next('SE REGISTRO');
                      });
                      Swal.fire('Registrar Apoderado', 'Registro Exitoso!', 'success')
                      this.dialogRef.close();
                  }
               }else{
                  Swal.fire('Registrar Apoderado', 'Por favor Ingresar la Fecha de Nacimeinto', 'warning')
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
  listarParentesco(){
    
  this.parentesto = Globales.listaParentesto;
 }
 listarTipoDocumento(){
    
  this.tipoDocumento = Globales.listaTipoDocumento;

}

 validarSeleccion(id: number){

  console.log(id);

 }
 validarCampos(){
  console.log(this.apoderado.nombre);
  if (this.apoderado.nombre != null){
    if (this.apoderado.nombre.length== 0 ){
        this.validacion.nombre_text= true;
        this.validacion.nombre_count= false;
        console.log("a");
    }else{
      if (this.apoderado.nombre.length<2 ){
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
console.log(this.apoderado.apellidos);
if (this.apoderado.apellidos != null){
    if (this.apoderado.apellidos.length== 0 ){
        this.validacion.apellido_text= true;
        this.validacion.apellido_count= false;
    }else{
      console.log(this.apoderado.apellidos.length);
      if (this.apoderado.apellidos.length< 2 ){
          this.validacion.apellido_count= true;
          this.validacion.apellido_text= false;
     }
     else{
          this.validacion.apellido_count= false;
          this.validacion.apellido_text= false;
     }
   }
  }

  console.log(this.apoderado.numDocumento);
if (this.apoderado.numDocumento != null){
    if (this.apoderado.numDocumento.length== 0 ){
        this.validacion.dni_text= true;
        this.validacion.dni_count= false;
    }else{
      console.log(this.apoderado.numDocumento.length);
      if (this.apoderado.numDocumento.length < 8 ){
      this.validacion.dni_count= true;
      this.validacion.dni_text= false;
     }
     else{
      this.validacion.dni_count= false;
      this.validacion.dni_text= false;
     }
   }
  }
 }
}


