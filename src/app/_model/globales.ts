import { Parentesco } from "./parentesto";

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
}