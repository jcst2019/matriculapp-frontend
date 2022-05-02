import { Rol } from "./rol";


export class MenuBD {
    idMenu!: number;
    nombre!: string;
    url!: string;
    icono!: string;
    roles!: Rol[];
    value!:boolean; //Este campo No es de la BD, pero lo uso para poder seleccionar o no el checkbox
}