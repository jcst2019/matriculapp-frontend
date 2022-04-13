import { Rol } from "./rol";


export class MenuBD {
    idMenu!: number;
    nombre!: string;
    url!: string;
    icono!: string;
    roles!: Rol[]; 
}