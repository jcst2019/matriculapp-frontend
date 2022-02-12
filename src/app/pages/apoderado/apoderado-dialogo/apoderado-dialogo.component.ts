import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Parentesco } from 'src/app/_model/parentesto';
import { Apoderado } from '../../../_model/apoderado';
import { ApoderadoService } from '../../../_service/apoderado.service';
import * as moment from 'moment';
import{ VariablesGlobales } from '../../../_model/VariablesGlobales';

@Component({
  selector: 'app-apoderado-dialogo',
  templateUrl: './apoderado-dialogo.component.html',
  styleUrls: ['./apoderado-dialogo.component.css']
})
export class ApoderadoDialogoComponent implements OnInit {

  apoderado!: Apoderado;
  parentesto!:Parentesco[];
  idParentescoSeleccionado!:number;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private apoderadoService :ApoderadoService,
    private dialogRef: MatDialogRef<ApoderadoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Apoderado
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.apoderado = new Apoderado();
    this.apoderado.idApoderado= this.data.idApoderado;
    this.apoderado.nombre= this.data.nombre;
    this.apoderado.apellidos= this.data.apellidos;
    this.apoderado.dni= this.data.dni;
    this.apoderado.telefono= this.data.telefono;
    this.apoderado.direccion= this.data.direccion;
    this.apoderado.email= this.data.email;
    //let idParentescoSeleccionado =this.data.tipo;
    //Cargar Parentesco
   // this.listarParentesco();
    this.idParentescoSeleccionado =this.data.tipo;
    this.listarParentesco();
    this.fechaSeleccionada = new Date(this.data.fechaNacimiento);
  }
  operar(){
    if(this.apoderado != null && this.apoderado.idApoderado > 0){

      //MODIFICAR
       //ISO Date
       console.log(this.data.fechaNacimiento);
       console.log(this.fechaSeleccionada);
       //Instalar Moment JS y probar que se registre la fecha correctamente
      //let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
      //let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();

      this.apoderado.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

      var fecha = moment(this.fechaSeleccionada);
      console.log(this.fechaSeleccionada);
      console.log(fecha);

      this.apoderado.fechaModificacion= moment().format('YYYY-MM-DDTHH:mm:ss');
      console.log(this.apoderado.fechaNacimiento);
      console.log(this.apoderado.fechaModificacion);
      this.apoderado.tipo = this.idParentescoSeleccionado;
      this.apoderado.estado = 1;
      this.apoderadoService.modificar(this.apoderado).pipe(switchMap( () => {
        return this.apoderadoService.listar();
      })).subscribe(data => {
        this.apoderadoService.apoderadoCambio.next(data);
        this.apoderadoService.mensajeCambio.next('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      this.apoderado.fechaNacimiento = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
      this.apoderado.fechaRegistro= moment().format('YYYY-MM-DDTHH:mm:ss');
      this.apoderado.tipo = this.idParentescoSeleccionado;
      this.apoderado.estado = 1;
      this.apoderadoService.registrar(this.apoderado).pipe(switchMap( () => {
        return this.apoderadoService.listar();
      })).subscribe(data => {
        this.apoderadoService.apoderadoCambio.next(data);
        this.apoderadoService.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.dialogRef.close();

  }
  cancelar(){
    this.dialogRef.close();

  }
  cambieFecha(e: any) {
    console.log(e);
  }
  listarParentesco(){
    
  this.parentesto = VariablesGlobales.listaParentesto;
 }
 validarSeleccion(id: number){

  console.log(id);

 }
}


