import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Alumno } from 'src/app/_model/alumno';
import { Globales } from 'src/app/_model/globales';
import { Matricula } from 'src/app/_model/matricula';
import Swal from 'sweetalert2';

import { MatriculaService } from '../../_service/matricula.service';
import { ProgramacionMatricula } from '../../_model/programacionMatricula';
import { CronogramaService } from '../../_service/cronograma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramacionDialogoComponent } from '../programacion/programacion-dialogo/programacion-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatriculaRegistroComponent } from './matricula-registro/matricula-registro.component';
import { CronogramaComponent } from '../cronograma/cronograma.component';
import { Cronograma } from 'src/app/_model/cronograma';
import { DetalleCronograma } from '../../_model/detalleCronograma';
import {finalize} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ProgramacionDetalleComponent } from '../programacion/programacion-detalle/programacion-detalle.component';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  displayedColumns =['idMatricula','fechaMatricula','estado','alumno','programacion','constancia','cronograma','acciones'];
  dataSource!: MatTableDataSource<Matricula>;
  cronograma$!: Subscription;
  cronograma!: Cronograma;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matriculaService : MatriculaService,
    private cronogramaService : CronogramaService,
    private dialog: MatDialog,
    ) { }


  ngOnInit() {
    this.matriculaService.matriculaCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.matriculaService.listar().subscribe(data =>{
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
   abrirDialogo(matricula?: Matricula){
    

   //this.cronogramaService.obtenerCronogramaPorMatricula(matricula!.idMatricula)
   //   .pipe(finalize(() => this.abrirCronogramaComponent(this.cronograma)))
   //   .subscribe(data => {
   //     console.log("Cronograma", data);
   //     this.cronograma = data;
   //   });

   //   this.cronograma$ =this.cronogramaService.obtenerCronogramaPorMatricula(matricula!.idMatricula).subscribe(
   //     datos=>{
   //       this.cronograma = datos;
   //     }
   //   );

    console.log(this.cronograma);
    this.dialog.open(CronogramaComponent, {
      width: '950px',
      data:matricula
    });
  }
  abrirDetalleProgramacionDialogo(matricula?: Matricula){
    console.log(this.cronograma);
    this.dialog.open(ProgramacionDetalleComponent, {
      width: '950px',
      data:matricula
    });
  }
  
  abrirCronogramaComponent(cronograma?: Cronograma) {

    console.log(cronograma);
    this.dialog.open(CronogramaComponent, {
      width: '950px',
      data:cronograma
    });
  }

  eiminar(programacion?: Matricula) {

 
  }
   operar(){
    console.log("Regresar")
    //this.router.navigate(['nuevo'], {relativeTo: this.route});
    this.router.navigate(['matriculanuevo']);
  }
  descargarConstanciaMatricula(matricula?: Matricula){
    this.matriculaService.generarConstanciaMatricula(matricula!.idMatricula).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'constancia_matricula.pdf';
      a.click();
    });
  }

}
