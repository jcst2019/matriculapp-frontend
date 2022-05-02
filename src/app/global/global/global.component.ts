import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent {

  public static nombreUsuario: string = "Nombre Usuario"; //Intenté crear una variable global para manejar el nombre del usuario. Pero solo permite constantes

}
