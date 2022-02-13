import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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


@Component({
  selector: 'app-alumno-dialogo',
  templateUrl: './alumno-dialogo.component.html',
  styleUrls: ['./alumno-dialogo.component.css']
})
export class AlumnoDialogoComponent implements OnInit {

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
    }else{
      //REGISTRAR
      this.alumno.fechaIngreso = moment(this.fechaIngresoSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
      this.alumno.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
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
    }
    this.dialogRef.close();

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


