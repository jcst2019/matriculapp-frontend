import { Apoderado } from 'src/app/_model/apoderado';
export class FiltroAlumnoDTO{
    
    idAlumno!: string; //Lo coloco como string para que no se muestre 0 en la consulta de alumnos
    nombre!:string;
    apellidos!:string;
    numDocumento!:string;
    fechaNacimiento!:string;//Lo coloco como string para que no se muestre 31/12/1969 en la consulta de alumnos
    fechaIngreso!:string;//Lo coloco como string para que no se muestre 31/12/1969 en la consulta de alumnos
    tipoDescuento!:number;

    constructor(idAlumno:string, nombre:string, apellidos:string, numDocumento:string, 
                fechaNacimiento: string,  fechaIngreso: string, tipoDescuento:number){
                    this.idAlumno = idAlumno;
                    this.nombre=nombre;
                    this.apellidos=apellidos;
                    this.numDocumento=numDocumento;
                    this.fechaNacimiento=fechaNacimiento;
                    this.fechaIngreso=fechaIngreso;
                    this.tipoDescuento=tipoDescuento;

    }

}