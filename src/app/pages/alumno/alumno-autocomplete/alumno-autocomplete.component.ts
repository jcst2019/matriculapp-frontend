import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_service/alumno.service';


@Component({
  selector: 'app-alumno-autocomplete',
  templateUrl: './alumno-autocomplete.component.html',
  styleUrls: ['./alumno-autocomplete.component.css']
})
export class AlumnoAutocompleteComponent   implements OnInit {


  form!: FormGroup;
  alumnos: Alumno[] = [];

  alumnoSeleccionado!: Alumno;
  @Output() alumnoSeleccionadoGlobal = new EventEmitter<Alumno>();

  //utiles para el autocomplete
  myControlAlumno: FormControl = new FormControl();
  alumnosFiltrados!: Observable<any[]>;

  constructor(
    private alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'alumno': this.myControlAlumno
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
    this.alumnosFiltrados = this.myControlAlumno.valueChanges.pipe(map(val => this.filtrarProgramaciones(val)))
 
  }
  filtrarProgramaciones(val : any){
    if(val != null && val.idAlumno > 0){
      return this.alumnos.filter(x => 
        x.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || x.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || x.dni.includes(val.dni)
      );
    }else{
      //string
      return this.alumnos.filter(x => 
        x.nombre.toLowerCase().includes(val.toLowerCase()) || x.apellidos.toLowerCase().includes(val.toLowerCase()) || x.dni.includes(val)
      );
    }  
  }
  listarProgramaciones() {
    this.alumnoService.listar().subscribe(data => {
      this.alumnos = data;
    });
  }
  seleccionarAlumno(e : any){
    console.log("seleccionarAlumno");
    this.alumnoSeleccionado = e.option.value;
    console.log("1.=");
    this.alumnoSeleccionadoGlobal.emit(this.alumnoSeleccionado); 
    console.log("2.=");
    //console.log(this.alumnoSeleccionadoGlobal);
  }
  mostrarAlumno(val : Alumno){
    return val ? `${val.nombre} ${val.apellidos}` : val;
  }
}

