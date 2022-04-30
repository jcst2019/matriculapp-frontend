export class FiltroApoderadoDTO{
    
    idApoderado!: string; //Lo coloco como string para que no se muestre 0 en la consulta de alumnos
    nombre!:string;
    apellidos!:string;
    numDocumento!:string;
    telefono!:string;
    fechaNacimiento!:string;//Lo coloco como string para que no se muestre 31/12/1969 en la consulta de alumnos
    fechaRegistro!:string;//Lo coloco como string para que no se muestre 31/12/1969 en la consulta de alumnos

    constructor(idApoderado:string, nombre:string, apellidos:string, numDocumento:string, telefono:string,
                fechaNacimiento: string,  fechaRegistro: string){
                    this.idApoderado = idApoderado;
                    this.nombre=nombre;
                    this.apellidos=apellidos;
                    this.numDocumento=numDocumento;
                    this.telefono = telefono;
                    this.fechaNacimiento=fechaNacimiento;
                    this.fechaRegistro=fechaRegistro;

    }

}