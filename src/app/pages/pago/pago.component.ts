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
import { CronogramaComponent } from '../cronograma/cronograma.component';
import { Cronograma } from 'src/app/_model/cronograma';
import { DetalleCronograma } from '../../_model/detalleCronograma';
import {finalize} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ProgramacionDetalleComponent } from '../programacion/programacion-detalle/programacion-detalle.component';
import { PagoService } from '../../_service/pago.service';
import { Pago } from 'src/app/_model/pago';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  displayedColumns =['idPago','descripcion','fechaPago','programacion','alumno','estado','mtoPagar','mtoPago','mtoPagoTotal','periodo','constancia'];
  pagos!:Array<Pago>;
  dataSource!: MatTableDataSource<Pago>;
  cronograma$!: Subscription;
  cronograma!: Cronograma;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matriculaService : MatriculaService,
    private cronogramaService : CronogramaService,
    private pagoService:PagoService,
    private dialog: MatDialog,
    ) { }


  ngOnInit() {

    this.pagoService.pagoCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pagos= data;
    });
    
    this.pagoService.listar().subscribe(data =>{
      console.log(data);
      //this.programacions =data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pagos= data;
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
    this.router.navigate(['pagonuevo']);
    
  }
  descargarConstanciaPago(pago?: Pago){
    this.pagoService.generarConstanciaPago(pago!.idPago).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
  }

  retornarEstadoDescuento( id:number):string {
    
    for (let registro of Globales.listaEstadoPago){
       if (registro.idEstado == id){
            return registro.desEstado
       }
    }
    return "";
   }

   retornarPosicionDetalle(idCronograma:number,idDetalleCronograma:number):number{
    //console.log('retornarPosicionDetalle');
    //console.log('idCronograma',idCronograma);
    //console.log('Pagos',this.pagos);

    const pagoFiltrado = this.pagos.filter( data => data.cronograma.idCronograma === idCronograma);
    const index = pagoFiltrado[0].cronograma.detalleCronograma.findIndex(
        data => data.idDetalleCronograma === idDetalleCronograma
      );
    /*
    this.pagos.filter( data => data.cronograma.idCronograma === idCronograma).forEach(function (value) {
      if(value.idDetalleCronograma = idDetalleCronograma){
        console.log(value.idDetalleCronograma);
      }
    });*/
    return index;
   }

}

