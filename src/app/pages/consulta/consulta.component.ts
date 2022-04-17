import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Descuento } from 'src/app/_model/descuento';
import { Globales } from 'src/app/_model/globales';
import { ConsultaAlumnoDetalleComponent } from './consulta-alumno-detalle/consulta-alumno-detalle.component';

interface ConsultaAlumnoDTO {
  nombre: string;
  apellido: string;
  documento: string;
  tipoDescuento: number;
  fechaNacimiento: string;
  fechaIngreso: string;
}
interface ConsultaApoderadoDTO {
  nombre: string;
  apellido: string;
  documento: string;
  telefono: string;
  fechaNacimiento: string;
  fechaRegistro: string;
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  idTipoConsulta:number = 0;
  tituloConsulta:string="Consulta";
  filtros: Array<boolean> = [false,false, false, false,false,false,false];
  tipoDescuento!:Descuento[];
  fechaIngresoSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  filtroAlumno:ConsultaAlumnoDTO= {
                                    nombre: "",
                                    apellido: "",
                                    documento: "",
                                    tipoDescuento:0,
                                    fechaNacimiento: "",
                                    fechaIngreso: "",
                                   }; 
  filtroApoderado:ConsultaApoderadoDTO= {
                                    nombre: "",
                                    apellido: "",
                                    documento: "",
                                    telefono:"",
                                    fechaNacimiento: "",
                                    fechaRegistro: "",
                                   };                                  
  
  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('Filtros Inicial',this.filtros);
    this.listarDescuentos();
  }
  validarSeleccion(tipo:string){
      this.ocultarFiltros();
      console.log(tipo);
      this.tituloConsulta="Consulta";
      //filtros[0]="Seleccinar"
      switch (tipo) {
        case '1':
            this.tituloConsulta = this.tituloConsulta + " de Alumnos";
            this.filtros[1]= true;
            break;
        case '2':
            this.tituloConsulta = this.tituloConsulta + " de Apoderados";
            this.filtros[2]= true;
            break;
        case '3':
            this.tituloConsulta = this.tituloConsulta + " de Programación Académica";
            this.filtros[3]= true;
            break;
        case '4':
            this.tituloConsulta = this.tituloConsulta + " de Matrícula";
            this.filtros[4]= true;
            break;
        case '5':
            this.tituloConsulta = this.tituloConsulta + " de Pagos";
            this.filtros[5]= true;
            console.log(this.filtros);
            console.log(this.filtros[5]);
            break; 
        case '6':
            this.tituloConsulta = this.tituloConsulta + " de Deuda";
            this.filtros[6]= true;
            console.log(this.filtros);
            console.log(this.filtros[6]);
            break;
      }
  }
  ocultarFiltros(){
    this.filtros[0]= false;
    this.filtros[1]= false;
    this.filtros[2]= false;
    this.filtros[3]= false;
    this.filtros[4]= false;
    this.filtros[5]= false;
    this.filtros[6]= false;
  }
  listarDescuentos(){
    
    this.tipoDescuento = Globales.listaTipoDescuento;
  }
  cambieFecha(e: any) {
    console.log(e);
  }
  abrirConsultaAlumnoDialogo(){

     let dto: ConsultaAlumnoDTO;
     dto = {
      nombre: this.filtroAlumno.nombre,
      apellido: this.filtroAlumno.apellido,
      documento: this.filtroAlumno.documento,
      tipoDescuento:  this.filtroAlumno.tipoDescuento,
      fechaNacimiento: this.filtroAlumno.fechaNacimiento,
      fechaIngreso: this.filtroAlumno.fechaIngreso,
    };

    console.log(dto);
    this.dialog.open(ConsultaAlumnoDetalleComponent, {
      width: '950px',
      data:dto
    });
  }
  seleccionarTipoDescuento(tipo:number){
    console.log('Tipo Descuento',tipo)
  }

}
