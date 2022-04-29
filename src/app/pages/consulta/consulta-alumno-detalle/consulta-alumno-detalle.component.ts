import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { ConsultaComponent } from '../consulta.component';
import { FiltroAlumnoDTO } from '../../../dto/filtroAlumnoDTO';
import { FiltroAlumnoServiceDTO } from '../../../dto/filtroAlumnoServiceDTO';
import { Globales } from 'src/app/_model/globales';

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
  //filtro:FiltroAlumnoServiceDTO = new FiltroAlumnoServiceDTO();
  dtOptions: any = {};
  
  constructor(
             @Inject(MAT_DIALOG_DATA) private data: Array<Alumno>,
             private dialogRef: MatDialogRef<ConsultaComponent>) { 
             console.log('Datos Recibiendo',data);
             this.alumnos = data;
  
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
  retornarGenero( id:number):string {
    
    for (let registro of Globales.listaGenero){
       if (registro.idGenero == id){
            return registro.desGenero
       }
    }
    return "";
   }
   
   retornarDescuento( id:number):string {
      
    for (let registro of Globales.listaTipoDescuento){
       if (registro.idDescuento == id){
            return registro.desTipoDescuento
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
