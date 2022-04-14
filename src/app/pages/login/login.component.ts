import { MenuService } from './../../_service/menu.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import '../../../assets/login-animation.js';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!: string;
  clave!: string;
  mensaje!: string;
  error!: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
/* Ya no se usa porque se elimino la imagen en movimiento del Jety
  ngAfterViewInit() {
    (window as any).initialize();
  }
*/
  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      console.log(data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      //this.router.navigate(['alumno'])

      const helper = new JwtHelperService();

      let decodedToken = helper.decodeToken(data.access_token);

      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        console.log("DATA Menu BD",data);
        this.menuService.setMenuCambio(data);
        this.router.navigate(['inicio']);
      });

      
    })
  }

}
