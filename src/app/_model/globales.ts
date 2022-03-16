import { Parentesco } from "./parentesto";
import { Descuento } from './descuento';
import { Genero } from './genero';
import { Nivel } from "./nivel";
import { Grado } from "./grado";
import { Seccion } from "./seccion";
import { Estado } from './estado';

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
        desTipoDescuento:"Ninguno"   
      },
      {
        idDescuento:2,
        desTipoDescuento:"Alumno Destacado"
      },
      {
        idDescuento:3,
        desTipoDescuento:"Familiar Administrativo"
      },
      {
        idDescuento:4,
        desTipoDescuento:"Deportista calificado"
      },
      {
        idDescuento:5,
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
public static listaNivel:Nivel[]=[
  {
    idNivel:1,
    desNivel:"Inicial"   
  },
  {
    idNivel:2,
    desNivel:"Primaria"
  }
  ,
  {
    idNivel:3,
    desNivel:"Secundaria"
  }
];
public static listaGrado:Grado[]=[
  {
    idGrado:1,
    desGrado:"Primero",
    abreviatura:"1ero"    
  },
  {
    idGrado:2,
    desGrado:"Segundo",
    abreviatura:"2do" 
  }
  ,
  {
    idGrado:3,
    desGrado:"Tercero",
    abreviatura:"3ro" 
  },
  {
    idGrado:4,
    desGrado:"Cuerto",
    abreviatura:"4to" 
  },
  {
    idGrado:5,
    desGrado:"Quinto",
    abreviatura:"5to" 
  },
  {
    idGrado:6,
    desGrado:"Sexto",
    abreviatura:"6to" 
  }
];
public static listaSeccion:Seccion[]=[
  {
    idSeccion:1,
    desSeccion:"A"  
  },
  {
    idSeccion:2,
    desSeccion:"B"  
  },
  {
    idSeccion:3,
    desSeccion:"C"  
  },
  {
    idSeccion:4,
    desSeccion:"D"  
  },
  {
    idSeccion:5,
    desSeccion:"E"  
  },
  {
    idSeccion:6,
    desSeccion:"F"  
  }
];
public static listaEstadoProgramacion:Estado[]=[
  {
    idEstado:1,
    desEstado:"Abierto"   
  },
  {
    idEstado:2,
    desEstado:"Cerrado"
  }
  ,
  {
    idEstado:3,
    desEstado:"Anulado"
  }
];
}