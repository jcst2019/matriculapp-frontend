import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Alumno } from 'src/app/_model/alumno';
import { Apoderado } from 'src/app/_model/apoderado';
import { ApoderadoService } from '../../../_service/apoderado.service';
import { AlumnoComponent } from '../../alumno/alumno.component';

@Component({
  selector: 'app-apoderado-autocomplete',
  templateUrl: './apoderado-autocomplete.component.html',
  styleUrls: ['./apoderado-autocomplete.component.css']
})
export class ApoderadoAutocompleteComponent implements OnInit {


  form!: FormGroup;
  apoderados: Apoderado[] = [];

  apoderadoSeleccionado!: Apoderado;
  @Output() apoderadoSeleccionadoGlobal = new EventEmitter<Apoderado>();
  @Input() apoderadoModificado!: Alumno; //Esta Variable viene del Formulario Alumnos.

  //utiles para el autocomplete
  myControlApoderado: FormControl = new FormControl();
  apoderadosFiltrados!: Observable<any[]>;

  constructor(
    private apoderadoService: ApoderadoService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'apoderado': this.myControlApoderado
    });

    this.listarApoderados();
    if (this.apoderadoModificado!=null){
      console.log("Pintando el alumno que viene de la mofificación");
      console.log(this.apoderadoModificado);
       //Esta lógica aplica porque solo espero guardar un solo Apoderado (Cambiar cuando se quiera enviar un arreglo de Apoderados se debe de modificar)
      this.myControlApoderado.setValue(this.apoderadoModificado.apoderados[0]); // Se envía 0 Porque por ahora solo espero 1 apoderado
    }
    /*
    this.myControlApoderado.setValue({
      "apellidos": "Avial Yanayaco",
       "direccion": "Tlaara",
       "dni": "45123636",
       "email": "prueba@sunat",
       "estado": 1,
       "fechaNacimiento": "2022-02-02T00:00:00",
       "idApoderado": 4,
       "nombre": "Paola",
       "telefono": "8415461654",
       "tipo": 2
       });*/
    this.apoderadosFiltrados = this.myControlApoderado.valueChanges.pipe(map(val => this.filtrarApoderados(val)))
 
  }
  filtrarApoderados(val : any){
    if(val != null && val.idApoderado > 0){
      return this.apoderados.filter(x => 
        x.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || x.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || x.numDocumento.includes(val.numDocumento)
      );
    }else{
      //string
      return this.apoderados.filter(x => 
        x.nombre.toLowerCase().includes(val.toLowerCase()) || x.apellidos.toLowerCase().includes(val.toLowerCase()) || x.numDocumento.includes(val)
      );
    }    
  }
  listarApoderados() {
    this.apoderadoService.listar().subscribe(data => {
      this.apoderados = data;
    });
  }
  seleccionarApoderado(e : any){
    console.log("seleccionarApoderado");
    this.apoderadoSeleccionado = e.option.value;
    this.apoderadoSeleccionadoGlobal.emit(this.apoderadoSeleccionado); 
    //console.log(this.apoderadoSeleccionadoGlobal);
  }
  mostrarApoderado(val : Apoderado){
    return val ? `${val.nombre} ${val.apellidos}` : val;
  }
}
