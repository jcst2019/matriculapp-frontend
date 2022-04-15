import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../_service/pago.service';
import Chart from 'chart.js/auto';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  
  chart:any;
  tipo!:string;
  public lineChartType!: ChartType;


  constructor(
      private pagoService:PagoService
  ) { }

  ngOnInit(): void {
    this.lineChartType='bar';
    this.dibujar();

  }

  cambiar(tipo: string) {
   
    this.tipo =tipo
    switch (this.tipo) {
      case 'line':
          this.lineChartType='line';
          break;
      case 'bar':
          this.lineChartType='bar';
          break;
      case 'doughnut':
          this.lineChartType='doughnut';
          break;
      case 'radar':
          this.lineChartType='radar';
          break;
      case 'pie':
          this.lineChartType='pie';
          break; 
      default:
          this.lineChartType='bar';
          break;
    }
    //this.lineChartType=this.tipo;
    this.dibujar();
   
  }
  dibujar(){
    this.pagoService.listarResumenPagos().subscribe(data=>{
      console.log(data);
      let cantidades = data.map(x => x.cantidad);
      let fechas = data.map(x => x.fecha);
      if (this.chart) {    this.chart.destroy();  }
      this.chart = new Chart('canvas', {
        type:  this.lineChartType,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Monto S/.',
              data: cantidades,
              borderColor: "#3cba9f",
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {

          scales: {
            x: {
              display: true
            },
            y: {
              display: true
            },
          }
        }
      });  
    });
  }

}
