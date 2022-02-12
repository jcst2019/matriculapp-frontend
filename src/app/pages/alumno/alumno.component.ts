import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { Alumno } from 'src/app/_model/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //alumnos: Alumno[]= [];
  displayedColumns =['idAlumno','nombre','apellidos','dni','tipoDescuento','fechaIngreso','fechaNacimiento','acciones'];
  dataSource!: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
     private alumnoService : AlumnoService,
     private snackBar:MatSnackBar
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

  eliminar(idAlumno:number){

    this.alumnoService.eliminar(idAlumno).pipe(switchMap( ()=> {
      return this.alumnoService.listar();
    })).subscribe(data =>{
      this.alumnoService.alumnoCambio.next(data);
      this.alumnoService.mensajeCambio.next('SE ELIMINO');
    });

  }

}
