import { Parentesco } from "./parentesto";
import { Descuento } from './descuento';
import { Genero } from './genero';

export class Globales {
 
    public static appUrl: string = "https://colegioseltriunfo.edu.pe/";
    public static appName: string = "Sistema de Matrículas IEP El Triunfo";
    public static appLogo: string = "assets/images/logo.png";
    public static appEmail: string = "soporte@colegioseltriunfo.edu.pe";
    public static listaParentesto:Parentesco[]=[
        {
          idParentesco:1,
          desTipo:"Padre"   
        },
        {
          idParentesco:2,
          desTipo:"Madre"
        },
        {
          idParentesco:3,
          desTipo:"Abuelo"
        },
        {
          idParentesco:4,
          desTipo:"Abuela"
        },
        {
          idParentesco:5,
          desTipo:"Tío"
        },
        {
          idParentesco:6,
          desTipo:"Tía"
        }
    ];
    public static listaTipoDescuento:Descuento[]=[
      {
        idDescuento:1,
        desTipoDescuento:"Alumno Destacado"   
      },
      {
        idDescuento:2,
        desTipoDescuento:"Familiar Administrativo"
      },
      {
        idDescuento:3,
        desTipoDescuento:"Deportista calificado"
      },
      {
        idDescuento:4,
        desTipoDescuento:"Músico Destacado"
      }
  ];
  public static listaGenero:Genero[]=[
    {
      idGenero:1,
      desGenero:"Masculino"   
    },
    {
      idGenero:2,
      desGenero:"Femenino"
    }
];
}