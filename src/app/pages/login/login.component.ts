import { MenuService } from './../../_service/menu.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import '../../../assets/login-animation.js';
import { LoginService } from 'src/app/_service/login.service';
import { UsuarioService } from '../../_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName!: string;
  clave!: string;
  mensaje!: string;
  error!: string;
  usuario:Usuario = new Usuario();

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private usuarioService:UsuarioService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
  }
/* Ya no se usa porque se elimino la imagen en movimiento del Jety
  ngAfterViewInit() {
    (window as any).initialize();
  }
*/
  iniciarSesion() {
    this.loginService.login(this.userName, this.clave).subscribe(data => {
      console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      //this.router.navigate(['alumno'])

      const helper = new JwtHelperService();

      let decodedToken = helper.decodeToken(data.access_token);

      //Obtener los datos del Usuario
      this.usuarioService.listarPorUsername(decodedToken.user_name).subscribe(data => {
           console.log("DATA Usuario",data);
           this.usuario = data;
           console.log("DATA Usuario",this.usuario);
           sessionStorage.setItem(environment.ID_USUARIO, this.usuario.idUsuario.toString());
           sessionStorage.setItem(environment.NAME_USUARIO, this.usuario.nombre+' '+this.usuario.apellidos);
           if(this.usuario.idUsuario>0){
                this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
                  console.log("DATA Menu BD",data);
                  this.menuService.setMenuCambio(data);
                  localStorage.setItem('listaMenu', JSON.stringify(data));
                  this.router.navigate(['inicio'])    
                    .then(() => {
                    window.location.reload();
                  });
                });  
           }
      });

    })
  }

}
