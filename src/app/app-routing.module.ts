import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { AlumnoEdicionComponent } from './pages/alumno/alumno-edicion/alumno-edicion.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { ProgramacionComponent } from './pages/programacion/programacion.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { MatriculaRegistroComponent } from './pages/matricula/matricula-registro/matricula-registro.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoRegistroComponent } from './pages/pago/pago-registro/pago-registro.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './_service/guard.service';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RolComponent } from './pages/rol/rol.component';

const routes: Routes = [
  
  { path: 'inicio', component:InicioComponent},
  { path: 'alumno', component: AlumnoComponent, children:[
      {path: 'nuevo', component: AlumnoEdicionComponent},
      {path: 'edicion/:id', component: AlumnoEdicionComponent}
    ],canActivate:[GuardService] 
  },
  { path: 'matricula', component: MatriculaComponent, children:[
      {path: 'nuevo', component: MatriculaRegistroComponent}
   ],canActivate:[GuardService]  
  },
  { path: 'matriculanuevo', component: MatriculaRegistroComponent,canActivate:[GuardService]},//Para no usar la RUTA Hija
  { path: 'apoderado', component:ApoderadoComponent,canActivate:[GuardService] },
  { path: 'programacion', component:ProgramacionComponent,canActivate:[GuardService] },
  { path: 'pago', component:PagoComponent,children:[
      {path: 'nuevo', component: PagoRegistroComponent}
   ],canActivate:[GuardService] 
  },
  { path: 'pagonuevo', component: PagoRegistroComponent,canActivate:[GuardService]},//Para no usar la RUTA Hija
  { path: 'reporte', component: ReporteComponent,canActivate:[GuardService]},
  { path: 'consulta', component: ConsultaComponent,canActivate:[GuardService]},
  { path: 'usuario', component: UsuarioComponent,canActivate:[GuardService]},
  { path: 'rol', component: RolComponent,canActivate:[GuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

