import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import * as moment from 'moment';
import{ Globales } from '../../../_model/globales';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { Descuento } from 'src/app/_model/descuento';
import { Genero } from 'src/app/_model/genero';
import { Apoderado } from 'src/app/_model/apoderado';
import { ApoderadoAutocompleteComponent } from '../../apoderado/apoderado-autocomplete/apoderado-autocomplete.component'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumno-dialogo',
  templateUrl: './alumno-dialogo.component.html',
  styleUrls: ['./alumno-dialogo.component.css']
})

export class AlumnoDialogoComponent implements OnInit {

  //validacion:boolean = true;//Falta analizar
  validacion = {nombre_text: false,nombre_count:false, 
                apellido_text: false,apellido_count:false, 
                dni_text: false,dni_count:false,
                apoderado_text:false};

  alumno!: Alumno;
  tipoDescuento!:Descuento[];
  tipoGenero!:Genero[];
  idTipoGeneroSeleccionado!:number;
  idTipoDescuentoSeleccionado!:number;
  fechaSeleccionada: Date = new Date();
  fechaIngresoSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private alumnoService :AlumnoService,
    private dialogRef: MatDialogRef<AlumnoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Alumno
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.alumno = new Alumno();
    this.alumno.idAlumno= this.data.idAlumno;
    //Debes de inicializar tus arreglos. Por defecto están como undefined y este no contiene la propiedad push.
    this.alumno.apoderados=this.data.apoderados; // Agragando la lista de Apoderados
    if (this.alumno.apoderados == null){
      this.alumno.apoderados= [];
    }
    this.alumno.nombre= this.data.nombre;
    this.alumno.apellidos= this.data.apellidos;
    this.alumno.dni= this.data.dni;
    this.alumno.telefono= this.data.telefono;
    this.alumno.direccion= this.data.direccion;
    this.alumno.email= this.data.email;
    //let idTipoDescuentoSeleccionado =this.data.tipo;
    //Cargar Parentesco
   // this.listarParentesco();
    this.idTipoDescuentoSeleccionado =this.data.tipoDescuento;
    this.idTipoGeneroSeleccionado= this.data.genero;
    this.listarDescuentos();
    this.listarGenero();
    this.fechaSeleccionada = new Date(this.data.fechaNacimiento);
    this.fechaIngresoSeleccionada = new Date(this.data.fechaIngreso);
    this.validarCampos();
  }
  operar(){

    if(this.alumno != null && this.alumno.idAlumno > 0){

      //MODIFICAR
       //ISO Date
       console.log(this.data.fechaNacimiento);
       console.log(this.fechaSeleccionada);
       //Instalar Moment JS y probar que se registre la fecha correctamente
      //let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
      //let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
      this.alumno.fechaIngreso = moment(this.fechaIngresoSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
      this.alumno.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

      var fecha = moment(this.fechaSeleccionada);
      console.log(this.fechaSeleccionada);
      console.log(fecha);

      this.alumno.fechaModificacion= moment().format('YYYY-MM-DDTHH:mm:ss');
      console.log(this.alumno.fechaNacimiento);
      console.log(this.alumno.fechaModificacion);
      this.alumno.tipoDescuento = this.idTipoDescuentoSeleccionado;
      this.alumno.estado = 1;
      this.alumno.genero=this.idTipoGeneroSeleccionado;
      console.log(this.alumno);
      this.alumnoService.modificar(this.alumno).pipe(switchMap( () => {
        return this.alumnoService.listar();
      })).subscribe(data => {
        this.alumnoService.alumnoCambio.next(data);
        this.alumnoService.mensajeCambio.next('SE MODIFICO');
      });
      this.dialogRef.close();
    }else{
      //REGISTRAR
      console.log( this.alumno);
      console.log(this.alumno.fechaIngreso);
      console.log(this.fechaIngresoSeleccionada);
      this.validarCampos();
      if( typeof this.alumno.nombre === "undefined" ||
          typeof this.alumno.apellidos === "undefined"||
          typeof this.alumno.dni === "undefined" ||
          //isNaN(this.fechaIngresoSeleccionada.getTime()) || --Validar si el campo Date es válido
          this.alumno.apoderados.length == 0 ){
        Swal.fire('Registrar Alumno', 'Falta llenar campos Obligatorios!', 'warning')
      }else{
      console.log(this.validacion.apellido_count);
      if (this.validacion.nombre_count ||
          this.validacion.nombre_text ||
          this.validacion.apellido_count ||
          this.validacion.apellido_text ||
          this.validacion.dni_count ||
          this.validacion.dni_text){
        Swal.fire('Registrar Alumno', 'Falta llenar campos Obligatorios!', 'warning')
      }else{
           if (!isNaN(this.fechaIngresoSeleccionada.getTime())){ //Validar si ha llenado el DatePicker de Fecha de Ingreso
              this.alumno.fechaIngreso = moment(this.fechaIngresoSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
           }
           if (!isNaN(this.fechaSeleccionada.getTime())){//Validar si ha llenado el DatePicker de Fecha de Nacimiento
              this.alumno.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
           }   
            this.alumno.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
            this.alumno.tipoDescuento = this.idTipoDescuentoSeleccionado;
            this.alumno.estado = 1;
            this.alumno.genero=this.idTipoGeneroSeleccionado;
            console.log(this.alumno);
            this.alumnoService.registrar(this.alumno).pipe(switchMap( () => {
              return this.alumnoService.listar();
            })).subscribe(data => {
              this.alumnoService.alumnoCambio.next(data);
              this.alumnoService.mensajeCambio.next('SE REGISTRO');
            });
            Swal.fire('Registrar Alumno', 'Registro Exitoso!', 'success')
            this.dialogRef.close();
     }}
    }
    //this.dialogRef.close();
  }
  cancelar(){
    this.dialogRef.close();

  }
  cambieFecha(e: any) {
    console.log(e);
  }
  listarDescuentos(){
    
   this.tipoDescuento = Globales.listaTipoDescuento;
 }

 listarGenero(){
    
  this.tipoGenero = Globales.listaGenero;

}
validarCampos(){
  console.log(this.alumno.nombre);
  if (this.alumno.nombre != null){
    if (this.alumno.nombre.length== 0 ){
        this.validacion.nombre_text= true;
        this.validacion.nombre_count= false;
        console.log("a");
    }else{
      if (this.alumno.nombre.length<=3 ){
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
console.log(this.alumno.apellidos);
if (this.alumno.apellidos != null){
    if (this.alumno.apellidos.length== 0 ){
        this.validacion.apellido_text= true;
        this.validacion.apellido_count= false;
    }else{
      console.log(this.alumno.apellidos.length);
      if (this.alumno.apellidos.length<= 3 ){
      this.validacion.apellido_count= true;
      this.validacion.apellido_text= false;
     }
     else{
      this.validacion.apellido_count= false;
      this.validacion.apellido_text= false;
     }
   }
  }

  console.log(this.alumno.dni);
if (this.alumno.dni != null){
    if (this.alumno.dni.length== 0 ){
        this.validacion.dni_text= true;
        this.validacion.dni_count= false;
    }else{
      console.log(this.alumno.dni.length);
      if (this.alumno.dni.length < 8 ){
      this.validacion.dni_count= true;
      this.validacion.dni_text= false;
     }
     else{
      this.validacion.dni_count= false;
      this.validacion.dni_text= false;
     }
   }
  }
  console.log(this.alumno.apoderados);
  if (this.alumno.apoderados != null){
      if (this.alumno.apoderados.length== 0 ){
          this.validacion.apoderado_text= true;
      }else{
        console.log(this.alumno.apoderados.length);
        if (this.alumno.apoderados.length >= 1){
        this.validacion.apoderado_text= false;
       }
    }
  console.log(this.alumno.nombre);
  console.log(this.validacion);
  //console.log(this.alumno.nombre.length);
}
}
 validarSeleccion(id: number){

  console.log(id);

 }
 procesarEvento(response: Apoderado) {
  console.log("Procesar Evento Alumno");    
  console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
  //Esta lógica aplica porque solo espero guardar un solo Apoderado (Cambiar cuando se quiera enviar un arreglo de Apoderados)
  if(this.alumno.apoderados.length>0){
    this.alumno.apoderados= []; //Inicializamos el valor en cero
  }
  this.alumno.apoderados.push(response);
}

 
}


