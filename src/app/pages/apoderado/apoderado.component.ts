import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Apoderado } from 'src/app/_model/apoderado';
import { ApoderadoService } from 'src/app/_service/apoderado.service';
import { ApoderadoDialogoComponent } from './apoderado-dialogo/apoderado-dialogo.component';

@Component({
  selector: 'app-apoderado',
  templateUrl: './apoderado.component.html',
  styleUrls: ['./apoderado.component.css']
})
export class ApoderadoComponent implements OnInit {

  displayedColumns = ['idapoderado', 'nombres', 'apellidos', 'dni','direccion','telefono','email','tipo','fechaNacimiento', 'acciones'];
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
      width: '250px',
      data: apod
    });
  }

  eliminar(apoderado: Apoderado) {
    this.apoderadoService.eliminar(apoderado.idApoderado).pipe(switchMap( () => {
      return this.apoderadoService.listar();
    })).subscribe( data => {
      this.apoderadoService.apoderadoCambio.next(data);
      this.apoderadoService.mensajeCambio.next('SE ELIMINO');
    });
  }

}

