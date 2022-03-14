import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Apoderado } from 'src/app/_model/apoderado';
import { Parentesco } from 'src/app/_model/parentesto';
import { Globales } from 'src/app/_model/globales';
import { ApoderadoService } from 'src/app/_service/apoderado.service';
import { ApoderadoDialogoComponent } from './apoderado-dialogo/apoderado-dialogo.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apoderado',
  templateUrl: './apoderado.component.html',
  styleUrls: ['./apoderado.component.css']
})
export class ApoderadoComponent implements OnInit {

  displayedColumns = ['idApoderado', 'nombre', 'apellidos', 'dni','direccion','telefono','tipo','fechaNacimiento','email', 'acciones'];
  dataSource!: MatTableDataSource<Apoderado>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apoderadoService: ApoderadoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.apoderadoService.apoderadoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.apoderadoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.apoderadoService.listar().subscribe(data => {
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
    this.dialog.open(ApoderadoDialogoComponent, {
      width: '450px',
      data: apod
    });
  }

  eliminar(apoderado: Apoderado) {
    let textEliminar: string = `Eliminaras al Apoderado ${apoderado.nombre}  ${apoderado.apellidos} .`;
    let textEliminado: string = `Se eliminó al Apoderado ${apoderado.nombre}  ${apoderado.apellidos} .`; 
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar?',
      text: textEliminar,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'No, Eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.apoderadoService.eliminar(apoderado.idApoderado).pipe(switchMap( () => {
          return this.apoderadoService.listar();
        })).subscribe( data => {
          this.apoderadoService.apoderadoCambio.next(data);
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

   retornarParentesco( id:number):string {
    
  for (let registro of Globales.listaParentesto){
     if (registro.idParentesco == id){
          return registro.desTipo
     }
  }
  return "";
 }
}

