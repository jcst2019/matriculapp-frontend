import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Globales } from 'src/app/_model/globales';
import { CronogramaService } from 'src/app/_service/cronograma.service';
import Swal from 'sweetalert2';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { AlumnoService } from 'src/app/_service/alumno.service';
import { ApoderadoService } from 'src/app/_service/apoderado.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../_service/usuario.service';
import { Usuario } from '../../../_model/usuario';
import { TipoDocuemnto } from '../../../_model/tipoDocumento';
import { environment } from 'src/environments/environment';
import { Rol } from 'src/app/_model/rol';
import { RolService } from '../../../_service/rol.service';


@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  scrollStrategy!: ScrollStrategy;
 
  usuario : Usuario = new Usuario();
  tipoDocumento!:TipoDocuemnto[];
  listaRoles!: Rol[];
  habilitaCambioClave: boolean = false;
  password!:string;
  repetirPassword!:string;
  tituloPerfil:string="Perfil de Usuario";

                                                          
  constructor( private readonly sso: ScrollStrategyOptions,
               private dialog: MatDialog,
               private UsuarioService:UsuarioService,
               private rolService:RolService,
               private router: Router,) { 
                this.scrollStrategy = this.sso.noop(); // or close()/block()/reposition()
               }

  ngOnInit(): void {

    this.listarTipoDocumento();
    let idUsuario : number =parseInt(sessionStorage.getItem(environment.ID_USUARIO)!);
    
    console.log('ID_USUARIO',sessionStorage.getItem(environment.ID_USUARIO));
    console.log('ID_USUARIO Integer',idUsuario);
    this.UsuarioService.listarPorId(idUsuario).subscribe(data => {
        this.usuario = data;
        console.log('Data Usuario',this.usuario);
      });
    this.rolService.listar().subscribe(data =>{
        console.log(data);
        this.listaRoles = data;
        console.log('Lista Roles',this.listaRoles);
      });
  }

  listarTipoDocumento(){
    
    this.tipoDocumento = Globales.listaTipoDocumento;
  }


  seleccionarTipoDocuemnto(tipo:number){
    console.log('Tipo Documento',tipo)
  }


  regresarComponentePrincipal(){
    this.router.navigate(['inicio']); 
  }
  habilitarCambioClave(){
    console.log('ok');
    if (this.habilitaCambioClave == true){
       this.habilitaCambioClave = false;
    }else{
       this.habilitaCambioClave = true;
    }
   
  }

  cambiarPassword(){
    if(this.password.length<3 || this.repetirPassword.length<3){ //Revisar el error cuando es undefined
      Swal.fire('Cambiar Password', "Por favor debe de ingresar mínimo 3 caracteres", 'warning')
    }else{
        if(this.password == this.repetirPassword){
          console.log('Ingresó');
          this.usuario.password=this.password;
          console.log('Usuario a Actualizar',this.usuario );
          this.UsuarioService.actualizarPassword(this.usuario).subscribe(data => {
            console.log('Data Usuario Actualizada',data);
            Swal.fire('Cambiar Password', 'Actualización Exitosa!', 'success')
          });
        }else{
        Swal.fire('Cambiar Password', "Las contraseñas no coinciden. Por favor revisar", 'warning')
        }
    }
  }
}
