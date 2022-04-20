import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { Alumno } from 'src/app/_model/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { AlumnoDialogoComponent } from './alumno-dialogo/alumno-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { Globales } from 'src/app/_model/globales';
import { Apoderado } from 'src/app/_model/apoderado';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  alumnos: Array<Alumno>= [];
  displayedColumns =['idAlumno','nombre','apellidos','tipoDocumento','documento','genero','tipoDescuento','apoderados','fechaIngreso','fechaNacimiento','acciones'];
  dataSource!: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() apoderadoModificadoGlobal = new EventEmitter<Apoderado>();

  constructor(
     private alumnoService : AlumnoService,
     private snackBar:MatSnackBar,
     private dialog: MatDialog,
    ) { }

  ngOnInit(): void {

    this.alumnoService.alumnoCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.alumnoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,"Aviso",{
        duration:2000
      });
    });

    this.alumnoService.listar().subscribe(data =>{
      //console.log(data);
      //this.alumnos =data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('Data Alumnos', data)
      this.alumnos = data;
      //console.log('Data Alumnos2', this.alumnos[1].apoderados)
    });

  }

  filtrar (valor :string){

    this.dataSource.filter = valor.trim().toLowerCase();

  }

  abrirDialogo(alumno?: Alumno) {
    let apod = alumno != null ? alumno : new Alumno();
    if(alumno == null){
      apod.tipoDescuento = 1
      apod.apoderados=[];//Limpiamos la lista de Apoderados puesto que por defecto puede tener algun valor del componente de apoderado-autocomplete.component.ts 
    }else{
      this.apoderadoModificadoGlobal.emit(alumno.apoderados[alumno.apoderados.length - 1]);//Como siempre hay un registro en esta lista se envía el primer elemento.
      console.log("funcion abrirDialogo");
      console.log(alumno.apoderados[alumno.apoderados.length - 1]);
    }
    this.dialog.open(AlumnoDialogoComponent, {
      width: '450px',
      data: apod
    });
  }

  eliminar(alumno: Alumno) {
    let textEliminar: string = `Eliminaras al alumno ${alumno.nombre}  ${alumno.apellidos} .`;
    let textEliminado: string = `Se eliminó al alumno ${alumno.nombre}  ${alumno.apellidos} .`; 
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar?',
      text: textEliminar,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'No, Eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.alumnoService.eliminar(alumno.idAlumno).pipe(switchMap( () => {
          return this.alumnoService.listar();
        })).subscribe( data => {
          this.alumnoService.alumnoCambio.next(data);
          //this.alumnoService.mensajeCambio.next('SE ELIMINO');
        });
        Swal.fire(
          'Eliminado!',
          textEliminado,
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        )
      }
    })
    //this.alumnoService.eliminar(alumno.idAlumno).pipe(switchMap( () => {
    //  return this.alumnoService.listar();
    //})).subscribe( data => {
    //  this.alumnoService.alumnoCambio.next(data);
    //  this.alumnoService.mensajeCambio.next('SE ELIMINO');
    //});
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

 retornarTipoDocumento( id:number):string {
    
  for (let registro of Globales.listaTipoDocumento){
     if (registro.idTipoDoc == id){
          return registro.desTipoDoc
     }
  }
  return "";
 }

}
