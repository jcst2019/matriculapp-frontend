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

const routes: Routes = [
  { path: 'alumno', component: AlumnoComponent, children:[
    {path: 'nuevo', component: AlumnoEdicionComponent},
    {path: 'edicion/:id', component: AlumnoEdicionComponent}
  ] },
  { path: 'matricula', component: MatriculaComponent, children:[
    {path: 'nuevo', component: MatriculaRegistroComponent}
  ] },
  { path: 'apoderado', component:ApoderadoComponent},
  { path: 'programacion', component:ProgramacionComponent},
  { path: 'pago', component:PagoComponent,children:[
    {path: 'nuevo', component: PagoRegistroComponent}
  ]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

