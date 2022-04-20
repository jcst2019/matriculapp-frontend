import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaComponent } from '../consulta.component';
import { Alumno } from '../../../_model/alumno';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Cronograma } from 'src/app/_model/cronograma';
import { DetalleCronograma } from 'src/app/_model/detalleCronograma';
import * as moment from 'moment';

@Component({
  selector: 'app-consulta-deuda-detalle',
  templateUrl: './consulta-deuda-detalle.component.html',
  styleUrls: ['./consulta-deuda-detalle.component.css']
})
export class ConsultaDeudaDetalleComponent implements OnInit {

  public datas = [
    {name: 'test', email: 'test@gmail.com', website:'test.com', website2:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com', website2:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com', website2:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com', website2:'test.com'},
    ]; 

  dtOptions: any = {};


  //alumnos:Array<Alumno>=[];
  alumnos:Alumno[]=[];
  listaCronogramaRecibida!:Array<Cronograma>;
  listaDetalleCronograma!:Array<DetalleCronograma>;
  montoDeuda:number= 0;
  montoAuxiliar:number= 0;
  fechaDeuda!:string;
  alumnoDeuda:Alumno = new Alumno();
  displayedColumnsAlumno =['idAlumno','nombre','apellidos','dni','genero','detalle'];
  // Usamos este activador porque buscar la lista de personas puede ser bastante largo,
  // por lo tanto, nos aseguramos de que los datos se obtengan antes de renderizar
  dtTrigger: Subject<any> = new Subject();

  constructor( @Inject(MAT_DIALOG_DATA) private data: Array<Cronograma>,
               private dialogRef: MatDialogRef<ConsultaComponent>,
               private alumnoService : AlumnoService             
             ){ 
               console.log('Datos Recibiendo',data);
               //Por regla de Negocio,un alumno No podrá matricularse si mantiene deuda pendiente. Por lo tanto siempre tendrá 1 Registro (listaCronogramaRecibida).
               this.listaCronogramaRecibida = data
               this.listaDetalleCronograma=data[0].detalleCronograma.filter(
                   data => (data.montoPagar-data.montoPagado)>0
               );
               this.fechaDeuda = this.listaCronogramaRecibida[0].fechaCronograma;
               this.fechaDeuda = moment(this.fechaDeuda).format('DD/MM/YYYY , h:mm:ss a'); 
               console.log('Lista Detalle', this.listaDetalleCronograma);
               console.log('Lista Detalle1', this.listaDetalleCronograma[0]);
               console.log('Lista Detalle2', this.listaDetalleCronograma[0].montoPagar);
              for(var i = 0; i < this.listaDetalleCronograma.length; i++){
                this.montoAuxiliar = this.listaDetalleCronograma[i].montoPagar -
                                     this.listaDetalleCronograma[i].montoPagado ;
                this.montoDeuda += this.montoAuxiliar;
              }
               //Obtenemos el alumno deudor
               this.alumnoDeuda=this.listaCronogramaRecibida[0].matricula.alumno;
               console.log('Lista Cronograma Recibida',data);
               /*
               this.alumnoRecibido = data;
               this.alumnoService.listar()
              .subscribe(response => {
                //setTimeout(() => {
                  this.alumnos = response;
                  console.log(response);
                  console.log('Datos Alumnos',this.alumnos);
                console.log('Datas',this.datas);
                this.dataSourceDeuda = new MatTableDataSource(this.alumnos);
                this.dataSourceDeuda.paginator = this.paginator;
                this.dataSourceDeuda.sort = this.sort;
                  // Calling the DT trigger to manually render the table
                 // this.dtTrigger.next;
                //});
              });*/
              }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel'
      ],
      language:{
        url:"https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
       }
    } 

  }


  cerrarDialogo(){
    this.dialogRef.close();
  }
  pintar(data:any){
    console.log('RoW',data)
  }

}
