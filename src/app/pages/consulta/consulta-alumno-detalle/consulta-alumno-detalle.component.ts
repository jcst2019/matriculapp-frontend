import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { ConsultaComponent } from '../consulta.component';

interface ConsultaAlumnoDTO {
  nombre: string;
  apellido: string;
  documento: string;
  tipoDescuento: number;
  fechaNacimiento: string;
  fechaIngreso: string;
}
@Component({
  selector: 'app-consulta-alumno-detalle',
  templateUrl: './consulta-alumno-detalle.component.html',
  styleUrls: ['./consulta-alumno-detalle.component.css']
})
export class ConsultaAlumnoDetalleComponent implements OnInit {

  alumnos:Array<Alumno>=[];
  
  constructor(
             @Inject(MAT_DIALOG_DATA) private data: ConsultaAlumnoDTO,
             private dialogRef: MatDialogRef<ConsultaComponent>,
             private alumnoService : AlumnoService) { 
             console.log('Datos Recibiendo',data);
             alumnoService.listar().subscribe(
              data =>{
                this.alumnos = data;
                console.log('Datos Alumnos',this.alumnos);
              })
  }

  ngOnInit(): void {
  }
  cerrarDialogo(){
    this.dialogRef.close();
  }

}
