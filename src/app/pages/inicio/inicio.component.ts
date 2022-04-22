import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
 
  nombreUsuario:string ="";
  constructor() { }

  ngOnInit(): void {

    console.log('Nombre del Session Storage',sessionStorage.getItem(environment.NAME_USUARIO));

    this.nombreUsuario = sessionStorage.getItem(environment.NAME_USUARIO)!;
  }

}
