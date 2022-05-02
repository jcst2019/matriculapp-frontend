import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Apoderado } from 'src/app/_model/apoderado';
import { Globales } from 'src/app/_model/globales';
import Swal from 'sweetalert2';
import { ApoderadoDialogoComponent } from '../apoderado/apoderado-dialogo/apoderado-dialogo.component';
import { RolService } from '../../_service/rol.service';
import { Rol } from 'src/app/_model/rol';
import { RolDialogoComponent } from './rol-dialogo/rol-dialogo.component';
import { RolMenuComponent } from './rol-menu/rol-menu.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  displayedColumns = ['idRol', 'rol', 'descripcion','estado','fechaRegistro', 'acciones'];
  dataSource!: MatTableDataSource<Rol>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private rolService: RolService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.rolService.rolCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.rolService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.rolService.listar().subscribe(data => {
      console.log("Data Rol",data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(apoderado?: Apoderado) {

    let apod = apoderado != null ? apoderado : new Apoderado();
    this.dialog.open(RolDialogoComponent, {
      width: '450px',
      data: apod
    });
  }

  eliminar(rol: Rol) {
    let textEliminar: string = `Eliminaras al Rol ${rol.rol} .`;
    let textEliminado: string = `Se eliminó al Rol ${rol.rol}.`; 
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar?',
      text: textEliminar,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'No, Eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.rolService.eliminar(rol.idRol).pipe(switchMap( () => {
          return this.rolService.listar();
        })).subscribe( data => {
          this.rolService.rolCambio.next(data);
          //this.apoderadoService.mensajeCambio.next('SE ELIMINO');
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

   retornarEstadoRol( id:number):string {
    
  for (let registro of Globales.listaEstadoRol){
     if (registro.idEstado == id){
          return registro.desEstado
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
 abrirAsignarMenu(rol?: Rol){

  console.log("Data Rol Seleccionado",rol);
  this.dialog.open(RolMenuComponent , {
    width: '450px',
    data: rol
  });
 }
}

