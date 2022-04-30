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
import { Rol } from 'src/app/_model/rol';
import { RolDialogoComponent } from '../rol/rol-dialogo/rol-dialogo.component';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Usuario } from '../../_model/usuario';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns = ['idUsuario', 'usuario','nombre','apellidos','rol','tipoDocuemnto','documento','fechaRegistro','acciones'];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.usuarioService.UsuarioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.usuarioService.listar().subscribe(data => {
      console.log("Data Usuario",data);
      console.log("Data 0",data[0].roles[0].rol);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(usuario?: Usuario) {

    let user = usuario != null ? usuario : new Apoderado();
    this.dialog.open(UsuarioDialogoComponent, {
      width: '450px',
      data: user
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
        this.usuarioService.eliminar(rol.idRol).pipe(switchMap( () => {
          return this.usuarioService.listar();
        })).subscribe( data => {
          this.usuarioService.UsuarioCambio.next(data);
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
}

