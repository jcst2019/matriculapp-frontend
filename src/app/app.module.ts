import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AlumnoEdicionComponent } from './pages/alumno/alumno-edicion/alumno-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { ApoderadoDialogoComponent } from './pages/apoderado/apoderado-dialogo/apoderado-dialogo.component';
import { AlumnoDialogoComponent } from './pages/alumno/alumno-dialogo/alumno-dialogo.component';
import { ApoderadoAutocompleteComponent } from './pages/apoderado/apoderado-autocomplete/apoderado-autocomplete.component';
import { NavComponent } from './nav/nav.component';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { FooterComponent } from './footer/footer.component';
import { ProgramacionComponent } from './pages/programacion/programacion.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { ProgramacionDialogoComponent } from './pages/programacion/programacion-dialogo/programacion-dialogo.component';
import { ProgramacionAutocompleteComponent } from './pages/programacion/programacion-autocomplete/programacion-autocomplete.component';
import { AlumnoAutocompleteComponent } from './pages/alumno/alumno-autocomplete/alumno-autocomplete.component';
import { MatriculaRegistroComponent } from './pages/matricula/matricula-registro/matricula-registro.component';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ProgramacionDetalleComponent } from './pages/programacion/programacion-detalle/programacion-detalle.component';
import { PagoRegistroComponent } from './pages/pago/pago-registro/pago-registro.component';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { JwtHelperService,JwtModule  } from "@auth0/angular-jwt";
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaAlumnoDetalleComponent } from './pages/consulta/consulta-alumno-detalle/consulta-alumno-detalle.component';
import { ConsultaDeudaDetalleComponent } from './pages/consulta/consulta-deuda-detalle/consulta-deuda-detalle.component';
import {DataTablesModule} from 'angular-datatables';
import { ProgramacionabiertaAutocompleteComponent } from './pages/programacion/programacionabierta-autocomplete/programacionabierta-autocomplete.component';
import { ConsultaApoderadoDetalleComponent } from './pages/consulta/consulta-apoderado-detalle/consulta-apoderado-detalle.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RolComponent } from './pages/rol/rol.component';
import { RolDialogoComponent } from './pages/rol/rol-dialogo/rol-dialogo.component';
import { UsuarioDialogoComponent } from './pages/usuario/usuario-dialogo/usuario-dialogo.component';
import { UsuarioPerfilComponent } from './pages/usuario/usuario-perfil/usuario-perfil.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    AlumnoEdicionComponent,
    ApoderadoComponent,
    ApoderadoDialogoComponent,
    AlumnoDialogoComponent,
    ApoderadoAutocompleteComponent,
    NavComponent,
    FooterComponent,
    ProgramacionComponent,
    MatriculaComponent,
    ProgramacionDialogoComponent,
    ProgramacionAutocompleteComponent,
    AlumnoAutocompleteComponent,
    MatriculaRegistroComponent,
    CronogramaComponent,
    PagoComponent,
    ProgramacionDetalleComponent,
    PagoRegistroComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    InicioComponent,
    ReporteComponent,
    ConsultaComponent,
    ConsultaAlumnoDetalleComponent,
    ConsultaDeudaDetalleComponent,
    ProgramacionabiertaAutocompleteComponent,
    ConsultaApoderadoDetalleComponent,
    UsuarioComponent,
    RolComponent,
    RolDialogoComponent,
    UsuarioDialogoComponent,
    UsuarioPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgMaterialMultilevelMenuModule,
    DataTablesModule,
    JwtModule.forRoot({
      config:{
       tokenGetter: tokenGetter,
       allowedDomains: [environment.HOST_SIN_HTTP],
       disallowedRoutes: [environment.RUTA_OAUTH]
      }
    })   
  ],
  providers: [{
              provide: HTTP_INTERCEPTORS,
              useClass: ServerErrorsInterceptor,
              multi: true,
               },MultilevelMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
