import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cronograma } from 'src/app/_model/cronograma';
import { Matricula } from 'src/app/_model/matricula';
import { CronogramaService } from 'src/app/_service/cronograma.service';
import { DetalleCronograma } from '../../_model/detalleCronograma';
import { Subscription } from 'rxjs';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit,OnDestroy {
  
  countries = COUNTRIES;
  cronograma$;
  cronograma:Cronograma = new Cronograma();
  detalleCronograma!:DetalleCronograma[];
  matricula!:Matricula;
  mostrarTabla: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Matricula,
    private dialogRef: MatDialogRef<CronogramaComponent>,
    private cronogramaService : CronogramaService

  ) { 
    this.cronograma$ =this.cronogramaService.obtenerCronogramaPorMatricula(data!.idMatricula).subscribe(
      datos=>{
        this.cronograma = datos;
        console.log('Datos',datos);
        console.log('Data Matricula',this.data);
        console.log('Detalle Matricula',this.data.alumno.apoderados);
        console.log('Cronograma Esperando',this.cronograma);
        console.log('DEtalle Cronograma Esperando',this.cronograma.detalleCronograma);
        this.detalleCronograma = this.cronograma.detalleCronograma;
      }
    )
    console.log('Datos Saliendo',this.cronograma);
  }
  ngOnDestroy(): void {
    this.cronograma$.unsubscribe();
  }

  ngOnInit(): void {

    console.log("Data Cronograma1",this.data);
    this.matricula =  this.data;

    console.log("Data Cronograma2",this.cronograma);
    //let cronograma =  this.data; 
    //let detalleCronograma = this.cronograma.detalleCronograma; 
    //if ( typeof this.detalleCronograma === "undefined"){
    //  console.log("1",detalleCronograma);
    //  this.detalleCronograma = []; 
    //}
    //console.log("Data Cronograma",this.data);
    //this.cronograma = this.data;
    //this.detalleCronograma =this.data.detalleCronograma;
    //console.log("Detalle Cronograma1",this.cronograma.detalleCronograma);
    //console.log("Detalle Cronograma2",this.detalleCronograma);
  }
  cerrarDialogo(){
    this.dialogRef.close();
  }

}
