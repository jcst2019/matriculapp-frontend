import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { Alumno } from 'src/app/_model/alumno';
import { Cronograma } from 'src/app/_model/cronograma';
import { DetalleCronogramaPagoDTO } from 'src/app/_model/detalleCronogramaPagoDTO';
import { Globales } from 'src/app/_model/globales';
import { Matricula } from 'src/app/_model/matricula';
import { Pago } from 'src/app/_model/pago';
import { ProgramacionMatricula } from 'src/app/_model/programacionMatricula';
import { CronogramaService } from 'src/app/_service/cronograma.service';
import Swal from 'sweetalert2';
import { DetalleCronograma } from '../../../_model/detalleCronograma';
import { PagoService } from '../../../_service/pago.service';
import { DetalleCronogramaService } from '../../../_service/detallecronograma.service';



@Component({
  selector: 'app-pago-registro',
  templateUrl: './pago-registro.component.html',
  styleUrls: ['./pago-registro.component.css']
})
export class PagoRegistroComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isShown: boolean = false ; // hidden by default

  idCronogramaSeleccionado!:number;
  //listaCronograma!:Array<Cronograma>;
  listaCronograma!:Array<Cronograma>;
  cronogramaFiltrado!:Array<Cronograma>; //Cronograma que seleccioné el Usuario
  listaDetalleCronograma!:Array<DetalleCronograma>;
  idDetalleCronogramaSeleccionado!:number;
  montoRegistrado!:number;
  descripcionRegistrada!:string;
  validaMontoPagar: boolean = false ; // hidden by default

  descuentoMensualidad!:any;
  //pago:Pago = new Pago();
  pago: Pago= new Pago();
  programacion!: ProgramacionMatricula[];
  programacionMatriculado: ProgramacionMatricula = new ProgramacionMatricula; //Variable que tiene la programación seleccionado por el Usuario
  alumno!: Alumno[];
  alumnoMatriculado: Alumno = new Alumno; //Variable que tiene el alumno seleccionado por el Usuario
  idProgMatricula!: number; //esta variable ya no se usa en este componente
  idAlumno!:number;//esta variable ya no se usa en este componente
  displayedColumns =['idProgMatricula','codigoMatricula','descripcion','estado','cantidadCuposTotal','cantidadCuposRegistrados','year','nivel','grado','seccion','montoMatricula','montoMensualidad'];
  dataSource!: MatTableDataSource<ProgramacionMatricula>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumnsAlumno =['idAlumno','nombre','apellidos','dni','genero','tipoDescuento','apoderados','fechaIngreso','fechaNacimiento'];
  dataSourceAlumno!: MatTableDataSource<Alumno>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private pagoService : PagoService,
    private cronogramaService : CronogramaService,
    private detalleCronogramaService :DetalleCronogramaService
    ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    
  }
  procesarEvento(response: ProgramacionMatricula) {
    console.log("Procesar Evento Programación");    
    console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
    this.programacion=[];//Inicializamos el valor en cero
    this.programacion.push(response);
    this.programacionMatriculado = this.programacion[0];
    this.idProgMatricula = this.programacion[0].idProgMatricula;

    console.log("Después de Asignar");  
    console.log( this.programacion);
    this.dataSource = new MatTableDataSource(this.programacion);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  procesarEventoAlumno(response: Alumno) {
    console.log("Procesar Evento Programación");    
    console.log(response);     // Esta es la función que se va a ejecutar en el componente padre 
    this.alumno=[];//Inicializamos el valor en cero
    this.alumno.push(response);
    this.alumnoMatriculado=this.alumno[0];
    this.idAlumno = this.alumno[0].idAlumno;

    console.log("Después de Asignar");  
    console.log( this.alumno);
    this.dataSourceAlumno = new MatTableDataSource(this.alumno);
    this.dataSourceAlumno.paginator = this.paginator;
    this.dataSourceAlumno.sort = this.sort;
    //Llenar la Lista de Cronogramas
    this.cronogramaService.obtenerCronogramaPorAlumno(this.alumnoMatriculado.idAlumno).subscribe(data =>{
      console.log(data);
      this.listaCronograma = data;
      console.log('Lista Cronograma',this.listaCronograma);
    });
  }
  retornarNivel( id:number):string {
    
    for (let registro of Globales.listaNivel){
       if (registro.idNivel == id){
            return registro.desNivel
       }
    }
    return "";
   }
   
   retornarEstado( id:number):string {
      
    for (let registro of Globales.listaEstadoProgramacion){
       if (registro.idEstado == id){
            return registro.desEstado
       }
    }
    return "";
   }
   retornarGrado( id:number):string {
      
    for (let registro of Globales.listaGrado){
       if (registro.idGrado == id){
            return registro.desGrado
       }
    }
    return "";
   }
  
   retornarSeccion( id:number):string {
      
    for (let registro of Globales.listaSeccion){
       if (registro.idSeccion == id){
            return registro.desSeccion
       }
    }
    return "";
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
   operar(){
    console.log(this.alumnoMatriculado.idAlumno)
    console.log(this.programacionMatriculado.idProgMatricula)
    if(this.alumnoMatriculado.idAlumno > 0 && 
      this.idCronogramaSeleccionado > 0 &&
      this.idDetalleCronogramaSeleccionado > 0 &&
      this.montoRegistrado > 0 &&
      this.validaMontoPagar == true){
        
      console.log(this.alumnoMatriculado)
      console.log(this.programacionMatriculado)
      this.pagoService.registrar(this.pago).pipe(switchMap( ()=>{
        return this.pagoService.listar();
         })).subscribe( data => {
            this.pagoService.pagoCambio.next(data);
        });
      //Registramos el pago en el Detalle de Cronograma

      const objetoDTO:DetalleCronogramaPagoDTO = new DetalleCronogramaPagoDTO();
      objetoDTO.idDetalleCronograma = this.pago.idDetalleCronograma;
      objetoDTO.montoPorPagar =  this.pago.mtoPago;
      const objDetalleCronograma = this.detalleCronogramaService.registrarMontoPagado(objetoDTO).subscribe();
      console.log("PagoDevueltoServicio",objDetalleCronograma);
      Swal.fire('Registrar Pago', 'Registro Exitoso!', 'success')
      this.router.navigate(['pago']); 
    }else{
          Swal.fire('Registrar Pago', 'Falta llenar campos Obligatorios!', 'warning')
    }
  }
  
  regresarComponentePrincipal(){
    this.router.navigate(['pago']); 
  }

  activarFormPago(){
    console.log(this.alumnoMatriculado.idAlumno)
    console.log(this.idCronogramaSeleccionado)
    console.log(this.idDetalleCronogramaSeleccionado)
    console.log(this.montoRegistrado)
    if(this.alumnoMatriculado.idAlumno > 0 && 
       this.idCronogramaSeleccionado > 0 &&
       this.idDetalleCronogramaSeleccionado > 0 &&
       this.montoRegistrado > 0){
        console.log(this.pago)
        if (this.montoRegistrado <= this.listaDetalleCronograma.filter( 
             data => data.idDetalleCronograma === this.idDetalleCronogramaSeleccionado)[0].montoPagar
           ){
           this.validaMontoPagar = true;
           this.pago.mtoPago= this.montoRegistrado;
           this.pago.fechaPago= moment().format('YYYY-MM-DDTHH:mm:ss');
           this.pago.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
           this.pago.estado = 1;
           this.pago.indTipoPago = 1;
           this.pago.descripcion =   this.descripcionRegistrada;
           this.pago.idDetalleCronograma = this.idDetalleCronogramaSeleccionado;
           console.log(this.pago)
           console.log(this.pago.cronograma)
           this.pago.cronograma =this.cronogramaFiltrado[0];//En la posición 0 esta el cronograma filtardo por el usuario
           this.isShown = true;
        }else{
          this.isShown = false;
          Swal.fire('Registrar Pago', 'El monto a Pagar es excesivo', 'warning')
        }
    }
    else{
      this.isShown = false;
    }
  }
  cargarPeriodoPagar(id:number){
    
    console.log('ID Cronograma Seleccionada',id)
    if (id>0){
      console.log('ID Cronograma Seleccionadaa',id)
      console.log('ListaCronograma',this.listaCronograma)
      //Filtramos El Cronograma Seleccionado
      this.cronogramaFiltrado = this.listaCronograma.filter( data => data.idCronograma === id);
      //Filtramos El Detalle de Cronograma  que tenga deuda
      this.listaDetalleCronograma=this.cronogramaFiltrado[0].detalleCronograma.filter(
        data => (data.montoPagar-data.montoPagado)>0);
      console.log('ListaDetalleCronograma',this.listaDetalleCronograma)
    }
  }
  mostrarSeleccion(id:number){

    console.log('ID Detalle Cronograma Seleccionado',id);

  }

  mostrarMontoRegistrado(id:number){

    console.log('ID Monto Registrado',id);

  }
  mostrarDescripcionRegistrado(descripcion:string){

    console.log('Descripcion Registrada',descripcion);

  }
  retornarPosicionDetalle(idDetalleCronograma:number):number{
    //console.log('retornarPosicionDetalle');
    //console.log('idCronograma',idCronograma);
    //console.log('Pagos',this.pagos);

    const index = this.pago.cronograma.detalleCronograma.findIndex(
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
