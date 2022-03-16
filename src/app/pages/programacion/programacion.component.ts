import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Programacion } from 'src/app/_model/programacion';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Globales } from 'src/app/_model/globales';
import { Apoderado } from 'src/app/_model/apoderado';
import Swal from 'sweetalert2';
import { ProgramacionDialogoComponent } from '../programacion/programacion-dialogo/programacion-dialogo.component';
import { ProgramacionService } from 'src/app/_service/programacion.service';


@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  //programacions: Programacion[]= [];
  displayedColumns =['idProgMatricula','codigoMatricula','descripcion','estado','cantidadCuposTotal','cantidadCuposRegistrados','year','nivel','grado','seccion','montoMatricula','montoMensualidad','acciones'];
  dataSource!: MatTableDataSource<Programacion>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() apoderadoModificadoGlobal = new EventEmitter<Apoderado>();

  constructor(
     private programacionService : ProgramacionService,
     private snackBar:MatSnackBar,
     private dialog: MatDialog,
    ) { }

  ngOnInit(): void {

    this.programacionService.programacionCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.programacionService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,"Aviso",{
        duration:2000
      });
    });

    this.programacionService.listar().subscribe(data =>{
      console.log(data);
      //this.programacions =data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  filtrar (valor :string){

    this.dataSource.filter = valor.trim().toLowerCase();

  }

  abrirDialogo(programacion?: Programacion) {

    let prog = programacion != null ? programacion : new Programacion();

    this.dialog.open(ProgramacionDialogoComponent, {
      width: '450px',
      data: prog
    });
  }

  eliminar(programacion: Programacion) {
    let textEliminar: string = `Eliminaras la programacion ${programacion.idProgMatricula} [ ${programacion.codigoMatricula} ].`;
    let textEliminado: string = `Se eliminó la programacion ${programacion.idProgMatricula} [ ${programacion.codigoMatricula} ].`; 
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar?',
      text: textEliminar,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'No, Eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.programacionService.eliminar(programacion.idProgMatricula).pipe(switchMap( () => {
          return this.programacionService.listar();
        })).subscribe( data => {
          this.programacionService.programacionCambio.next(data);
          //this.programacionService.mensajeCambio.next('SE ELIMINO');
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

}
