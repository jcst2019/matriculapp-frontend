import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/_model/alumno';
import { Globales } from 'src/app/_model/globales';
import { Programacion } from '../../_model/programacion';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  programacion!: Programacion[];
  programacionMatriculado: Programacion = new Programacion; //Variable que tiene la programación seleccionado por el Usuario
  alumno!: Alumno[];
  alumnoMatriculado: Alumno = new Alumno; //Variable que tiene el alumno seleccionado por el Usuario
  idProgMatricula!: number; //esta variable ya no se usa en este componente
  idAlumno!:number;//esta variable ya no se usa en este componente
  displayedColumns =['idProgMatricula','codigoMatricula','descripcion','estado','cantidadCuposTotal','cantidadCuposRegistrados','year','nivel','grado','seccion','montoMatricula','montoMensualidad'];
  dataSource!: MatTableDataSource<Programacion>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumnsAlumno =['idAlumno','nombre','apellidos','dni','genero','tipoDescuento','apoderados','fechaIngreso','fechaNacimiento'];
  dataSourceAlumno!: MatTableDataSource<Alumno>;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  procesarEvento(response: Programacion) {
    console.log("Procesar Evento Programación");    
    console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
    this.programacion=[];//Inicializamos el valor en cero
    this.programacion.push(response);
    this.programacionMatriculado = this.programacion[0];
    this.idProgMatricula = this.programacion[0].idProgMatricula;

    console.log("Después de Asignar");  
    console.log( this.programacion);
    this.dataSource = new MatTableDataSource(this.programacion);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  procesarEventoAlumno(response: Alumno) {
    console.log("Procesar Evento Programación");    
    console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
    this.alumno=[];//Inicializamos el valor en cero
    this.alumno.push(response);
    this.alumnoMatriculado=this.alumno[0];
    this.idAlumno = this.alumno[0].idAlumno;

    console.log("Después de Asignar");  
    console.log( this.alumno);
    this.dataSourceAlumno = new MatTableDataSource(this.alumno);
    this.dataSourceAlumno.paginator = this.paginator;
    this.dataSourceAlumno.sort = this.sort;
  }
  retornarNivel( id:number):string {
    
    for (let registro of Globales.listaNivel){
       if (registro.idNivel == id){
            return registro.desNivel
       }
    }
    return "";
   }
   
   retornarEstado( id:number):string {
      
    for (let registro of Globales.listaEstadoProgramacion){
       if (registro.idEstado == id){
            return registro.desEstado
       }
    }
    return "";
   }
   retornarGrado( id:number):string {
      
    for (let registro of Globales.listaGrado){
       if (registro.idGrado == id){
            return registro.desGrado
       }
    }
    return "";
   }
  
   retornarSeccion( id:number):string {
      
    for (let registro of Globales.listaSeccion){
       if (registro.idSeccion == id){
            return registro.desSeccion
       }
    }
    return "";
   }
   retornarGenero( id:number):string {
    
    for (let registro of Globales.listaGenero){
       if (registro.idGenero == id){
            return registro.desGenero
       }
    }
    return "";
   }
   
   retornarDescuento( id:number):string {
      
    for (let registro of Globales.listaTipoDescuento){
       if (registro.idDescuento == id){
            return registro.desTipoDescuento
       }
    }
    return "";
   }
}
