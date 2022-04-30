import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/app/_model/alumno';
import { Cronograma } from 'src/app/_model/cronograma';
import { Descuento } from 'src/app/_model/descuento';
import { Globales } from 'src/app/_model/globales';
import { ProgramacionMatricula } from 'src/app/_model/programacionMatricula';
import { CronogramaService } from 'src/app/_service/cronograma.service';
import Swal from 'sweetalert2';
import { ConsultaAlumnoDetalleComponent } from './consulta-alumno-detalle/consulta-alumno-detalle.component';
import { ConsultaDeudaDetalleComponent } from './consulta-deuda-detalle/consulta-deuda-detalle.component';
import { FiltroAlumnoDTO } from '../../dto/filtroAlumnoDTO';
import * as moment from 'moment';
import { AlumnoService } from '../../_service/alumno.service';
import { FiltroAlumnoServiceDTO } from 'src/app/dto/filtroAlumnoServiceDTO';
import { FiltroApoderadoDTO } from '../../dto/filtroApoderadoDTO';
import { FiltroApoderadoServiceDTO } from '../../dto/filtroApoderadoServiceDTO';
import { ApoderadoService } from '../../_service/apoderado.service';
import { Apoderado } from '../../_model/apoderado';
import { ConsultaApoderadoDetalleComponent } from './consulta-apoderado-detalle/consulta-apoderado-detalle.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

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

  scrollStrategy!: ScrollStrategy;

  listaCronograma!:Array<Cronograma>;
  listaAlumno!:Array<Alumno>;
  listaApoderado!:Array<Apoderado>;
  idTipoConsulta:number = 0;
  tituloConsulta:string="Consulta";
  filtros: Array<boolean> = [false,false, false, false,false,false,false];
  tipoDescuento!:Descuento[];
  fechaIngresoSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  alumno!: Alumno[];
  alumnoSeleccionado: Alumno = new Alumno; //Variable que tiene el alumno seleccionado por el Usuario
  programacion!: ProgramacionMatricula[];
  programacionMatriculado: ProgramacionMatricula = new ProgramacionMatricula; //Variable que tiene la programación seleccionado por el Usuario
  filtroAlumno:FiltroAlumnoDTO= {
                                    idAlumno: "",
                                    nombre: "",
                                    apellidos: "",
                                    numDocumento: "",
                                    tipoDescuento:0,
                                    fechaNacimiento: "",
                                    fechaIngreso: "",
                                   };
  filtroServiceAlumno:FiltroAlumnoServiceDTO = new FiltroAlumnoServiceDTO(); 
  filtroApoderado:FiltroApoderadoDTO= {
                                    idApoderado:"",
                                    nombre: "",
                                    apellidos: "",
                                    numDocumento: "",
                                    telefono:"",
                                    fechaNacimiento: "",
                                    fechaRegistro: "",
                                   };
  filtroServiceApoderado:FiltroApoderadoServiceDTO = new FiltroApoderadoServiceDTO();                                                                    
  
  constructor( private readonly sso: ScrollStrategyOptions,
               private dialog: MatDialog,
               private cronogramaService : CronogramaService,
               private alumnoService:AlumnoService,
               private apoderadoService:ApoderadoService) { 
                this.scrollStrategy = this.sso.noop(); // or close()/block()/reposition()
               }

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

     /*
     let dto: ConsultaAlumnoDTO;
     dto = {
      nombre: this.filtroAlumno.nombre,
      apellido: this.filtroAlumno.apellido,
      documento: this.filtroAlumno.documento,
      tipoDescuento:  this.filtroAlumno.tipoDescuento,
      fechaNacimiento: this.filtroAlumno.fechaNacimiento,
      fechaIngreso: this.filtroAlumno.fechaIngreso,
    };*/
    let filtro = new FiltroAlumnoDTO(this.filtroAlumno.idAlumno,
                                     this.filtroAlumno.nombre,
                                     this.filtroAlumno.apellidos,
                                     this.filtroAlumno.numDocumento,
                                     this.filtroAlumno.fechaNacimiento,
                                     this.filtroAlumno.fechaIngreso,
                                     this.filtroAlumno.tipoDescuento );

    //console.log(dto);
    console.log('Datos Recibiendo',filtro);
    this.filtroServiceAlumno.idAlumno = Number(filtro.idAlumno);
    this.filtroServiceAlumno.nombre = filtro.nombre;
    this.filtroServiceAlumno.apellidos=filtro.apellidos;
    this.filtroServiceAlumno.numDocumento=filtro.numDocumento;
    this.filtroServiceAlumno.tipoDescuento= filtro.tipoDescuento;
    this.filtroServiceAlumno.fechaIngreso=new Date(filtro.fechaIngreso);
    this.filtroServiceAlumno.fechaNacimiento=new Date(filtro.fechaNacimiento);

    console.log('Datos Alumnos Transformados',this.filtroServiceAlumno);
    this.alumnoService.filtrarAlumnos(this.filtroServiceAlumno).subscribe(
     data =>{
       this.listaAlumno = data;
        console.log('Datos Alumnos', this.listaAlumno);
        if (this.listaAlumno.length == 0){
              Swal.fire('Consultar Alumno', "No se encontraron alumnos con los filtros ingresados.", 'warning')
        }else{
           this.dialog.open(ConsultaAlumnoDetalleComponent, {
            width: '1050px',
            //data:dto
            data:this.listaAlumno
          });
        }
     })  
  }
  abrirConsultaApoderadoDialogo(){
   let filtro = new FiltroApoderadoDTO(this.filtroApoderado.idApoderado,
                                       this.filtroApoderado.nombre,
                                       this.filtroApoderado.apellidos,
                                       this.filtroApoderado.numDocumento,
                                       this.filtroApoderado.telefono,
                                       this.filtroApoderado.fechaNacimiento,
                                       this.filtroApoderado.fechaRegistro);

   //console.log(dto);
   console.log('Datos Fitro Apoderado Recibiendo',filtro);
   this.filtroServiceApoderado.idApoderado = Number(filtro.idApoderado);
   this.filtroServiceApoderado.nombre = filtro.nombre;
   this.filtroServiceApoderado.apellidos=filtro.apellidos;
   this.filtroServiceApoderado.numDocumento=filtro.numDocumento;
   this.filtroServiceApoderado.fechaRegsitro=new Date(filtro.fechaRegistro);
   this.filtroServiceApoderado.fechaNacimiento=new Date(filtro.fechaNacimiento);

   console.log('Datos Apoderados Transformados',this.filtroServiceApoderado);
   this.apoderadoService.filtrarApoderados(this.filtroServiceApoderado).subscribe(
    data =>{
      this.listaApoderado = data;
       console.log('Datos Apoderados', this.listaApoderado);
       if (this.listaApoderado.length == 0){
             Swal.fire('Consultar Apoderado', "No se encontraron apoderados con los filtros ingresados.", 'warning')
       }else{
          this.dialog.open(ConsultaApoderadoDetalleComponent,{
            width: '100%',
            autoFocus: false,
            scrollStrategy: this.scrollStrategy,
           //data:dto
           data:this.listaApoderado
         });
       }
    })  
 }
  abrirConsultaDeudaDialogo(){
    let alumnoFiltro: Alumno = new Alumno();
    if (this.alumnoSeleccionado.idAlumno > 0){
      alumnoFiltro = this.alumnoSeleccionado;

      this.cronogramaService.obtenerCronogramaPorAlumno(this.alumnoSeleccionado.idAlumno).subscribe(data =>{
        console.log(data);
        this.listaCronograma = data;
        console.log('Lista Cronograma',this.listaCronograma);
        if ( this.listaCronograma.length == 0){
              var textoMensaje = 'El alumno '+this.alumnoSeleccionado.nombre+' '+this.alumnoSeleccionado.apellidos+' No tiene Deuda!'
              Swal.fire('Consultar Deuda', textoMensaje, 'warning')
        }else{
            //Abrir el diálogo
            this.dialog.open(ConsultaDeudaDetalleComponent, {
              width: '950px',
              data:this.listaCronograma
            });
        }

      });
    }else{
      Swal.fire('Consultar Deuda', 'Falta ingresar un alumno válido!', 'warning')
    }

 }
  seleccionarTipoDescuento(tipo:number){
    console.log('Tipo Descuento',tipo)
  }
  procesarEventoAlumno(response: Alumno) {
    console.log("Procesar Evento Alumno");    
    console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
    this.alumno=[];//Inicializamos el valor en cero
    this.alumno.push(response);
    this.alumnoSeleccionado=this.alumno[0];

    console.log("Después de Asignar");  
    console.log( this.alumno);

  }
  procesarEventoProgramacion(response: ProgramacionMatricula) {
    console.log("Procesar Evento Programación");    
    console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
    this.programacion=[];//Inicializamos el valor en cero
    this.programacion.push(response);
    this.programacionMatriculado = this.programacion[0];

    console.log("Después de Asignar");  
    console.log( this.programacion);

  }

}
