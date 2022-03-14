import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alumno } from 'src/app/_model/alumno';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alumno-edicion',
  templateUrl: './alumno-edicion.component.html',
  styleUrls: ['./alumno-edicion.component.css']
})
export class AlumnoEdicionComponent implements OnInit {

  form!: FormGroup;
  id! : number;
  edicion! :boolean;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private alumnoService : AlumnoService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombres' : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(70)]),
      'apellidos' : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(70)]),
      'dni' : new FormControl(''),
      'telefono' : new FormControl(''),
      'direccion' : new FormControl('')
    });
    this.route.params.subscribe((params:Params)=>{
          this.id = params['id'];
          this.edicion = params['id'] != null;
          this.initForm();
    })

  }
  
  //Función de Solo Lectura
  get f(){
     return this.form.controls
    console.log( this.form.controls);
    }

  initForm(){

    if(this.edicion){
      this.alumnoService.listarPorId(this.id).subscribe(data=>{
        console.log(data);
        this.form = new FormGroup({
          'id' : new FormControl(data.idAlumno),
          'nombres' : new FormControl(data.nombre),
          'apellidos' : new FormControl(data.apellidos),
          'dni' : new FormControl(data.dni),
          'telefono' : new FormControl(data.telefono),
          'direccion' : new FormControl(data.direccion)
        });
      });

    }

  }

  operar( ){
    let alumno = new Alumno();
    alumno.idAlumno = this.form.value['id'];
    alumno.nombre = this.form.value['nombres'];
    alumno.apellidos = this.form.value['apellidos'];
    alumno.dni = this.form.value['dni'];
    alumno.telefono = this.form.value['telefono'];
    alumno.direccion = this.form.value['direccion'];
    alumno.estado=1;
    alumno.genero=2;
    alumno.tipoDescuento=3;
    
    if(this.edicion){
      //Forma Comun
      this.alumnoService.modificar(alumno).subscribe(()=>{
        this.alumnoService.listar().subscribe(data=>{
          this.alumnoService.alumnoCambio.next(data);
          this.alumnoService.mensajeCambio.next('SE MODIFICÓ');
        });
      });
      
    }else{
        //BUENA PRACTICA
        this.alumnoService.registrar(alumno).pipe(switchMap( ()=>{
        return this.alumnoService.listar();
         })).subscribe( data => {
            this.alumnoService.alumnoCambio.next(data);
            this.alumnoService.mensajeCambio.next('SE REGISTRO');
        });
    }
    this.router.navigate(['alumno']);
  }

}
