import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { ProgramacionService } from 'src/app/_service/programacion.service';
import { ProgramacionMatricula } from '../../../_model/programacionMatricula';


@Component({
  selector: 'app-programacionabierta-autocomplete',
  templateUrl: './programacionabierta-autocomplete.component.html',
  styleUrls: ['./programacionabierta-autocomplete.component.css']
})
export class ProgramacionabiertaAutocompleteComponent  implements OnInit {


  form!: FormGroup;
  programaciones: ProgramacionMatricula[] = [];

  programacionSeleccionado!: ProgramacionMatricula;
  @Output() programacionSeleccionadoGlobal = new EventEmitter<ProgramacionMatricula>();

  //utiles para el autocomplete
  myControlProgramacion: FormControl = new FormControl();
  programacionesFiltrados!: Observable<any[]>;

  constructor(
    private programacionService: ProgramacionService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'programacion': this.myControlProgramacion
    });

    this.listarProgramaciones();
    /*
    this.myControlProgramacion.setValue({
      "apellidos": "Avial Yanayaco",
       "direccion": "Tlaara",
       "dni": "45123636",
       "email": "prueba@sunat",
       "estado": 1,
       "fechaNacimiento": "2022-02-02T00:00:00",
       "idProgramacion": 4,
       "nombre": "Paola",
       "telefono": "8415461654",
       "tipo": 2
       });*/
    this.programacionesFiltrados = this.myControlProgramacion.valueChanges.pipe(map(val => this.filtrarProgramaciones(val)))
 
  }
  filtrarProgramaciones(val : any){
    console.log (val)
    if(val != null && val.idProgMatricula > 0){
      console.log (this.programaciones)
      return this.programaciones.filter(x => 
        x.codigoMatricula.toLowerCase().includes(val.codigoMatricula.toLowerCase()) 
      );
    }else{
      //string
      console.log (this.programaciones)
      return this.programaciones.filter(x => 
        x.codigoMatricula.toLowerCase().includes(val.toLowerCase()) 
      );
    }    
  }
  listarProgramaciones() {
    this.programacionService.listar().subscribe(data => {
      this.programaciones = data.filter(data => data.estado == 1);;
    });
  }
  seleccionarProgramacion(e : any){
    console.log("seleccionarProgramacion");
    this.programacionSeleccionado = e.option.value;
    console.log("1.=");
    this.programacionSeleccionadoGlobal.emit(this.programacionSeleccionado); 
    console.log("2.=");
    //console.log(this.programacionSeleccionadoGlobal);
  }
  mostrarProgramacion(val : ProgramacionMatricula){
    return val ? `[ ${val.idProgMatricula}] ${val.codigoMatricula}` : val;
  }
}

