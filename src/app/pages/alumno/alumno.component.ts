import { Component, OnInit, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //alumnos: Alumno[]= [];
  displayedColumns =['idAlumno','nombre','apellidos','dni','genero','tipoDescuento','fechaIngreso','fechaNacimiento','acciones'];
  dataSource!: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    });

  }

  filtrar (valor :string){

    this.dataSource.filter = valor.trim().toLowerCase();

  }

  abrirDialogo(alumno?: Alumno) {

    let apod = alumno != null ? alumno : new Alumno();
    this.dialog.open(AlumnoDialogoComponent, {
      width: '450px',
      data: apod
    });
  }

  eliminar(alumno: Alumno) {
    this.alumnoService.eliminar(alumno.idAlumno).pipe(switchMap( () => {
      return this.alumnoService.listar();
    })).subscribe( data => {
      this.alumnoService.alumnoCambio.next(data);
      this.alumnoService.mensajeCambio.next('SE ELIMINO');
    });
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
